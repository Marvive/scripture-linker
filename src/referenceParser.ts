import { BibleReference } from './types';
import { findBook, buildBookPattern, isValidReference } from './bibleBooks';

/** Cached compiled regex for reference matching */
let cachedReferenceRegex: RegExp | null = null;

/**
 * Get the reference regex (cached after first computation)
 */
function getReferenceRegex(): RegExp {
    if (cachedReferenceRegex) return new RegExp(cachedReferenceRegex.source, cachedReferenceRegex.flags);

    const bookPattern = buildBookPattern();
    // Full ref: Book 3:35 or Book 3:35-4:1
    // Use negative lookbehind (?<![a-zA-Z0-9]) to prevent matching inside words like "test"
    // We don't include parentheses in the match for full references to keep links clean
    const fullRefPattern = `(?<![a-zA-Z0-9])(${bookPattern})\\.?\\s*(\\d{1,3})(?:[:.](\\d{1,3})(?:[-–—](\\d{1,3})(?:[:.](\\d{1,3}))?)?)?`;
    // Shorthand: 3:35 or 3:35-4:1
    // Shorthand allows optional parentheses which are commonly used in texts
    const shorthandRefPattern = `(?<![a-zA-Z0-9])(?:\\()?(\\d{1,3}):(\\d{1,3})(?:[-–—](\\d{1,3})(?:[:.](\\d{1,3}))?)?(?:\\))?`;

    cachedReferenceRegex = new RegExp(`${fullRefPattern}|${shorthandRefPattern}`, 'gi');
    return new RegExp(cachedReferenceRegex.source, cachedReferenceRegex.flags);
}

/**
 * Parse a text string and find all Bible references
 * @param text The text to search for Bible references
 * @returns Array of found Bible references with their positions
 */
export function findAllReferences(text: string): BibleReference[] {
    const references: BibleReference[] = [];

    // Use cached regex for performance
    const combinedRegex = getReferenceRegex();

    let match;
    let lastBookName: string | null = null;
    let lastMatchEndIndex = 0;

    while ((match = combinedRegex.exec(text)) !== null) {
        // Reset lastBookName if there's a newline between matches
        const textSinceLastMatch = text.substring(lastMatchEndIndex, match.index);
        if (textSinceLastMatch.includes('\n')) {
            lastBookName = null;
        }

        const fullBookInput = match[1];
        let bookName: string | null = null;
        let chapter: number;
        let verseStart: number | undefined;
        let chapterEnd: number | undefined;
        let verseEnd: number | undefined;
        let rawText = match[0];

        if (fullBookInput) {
            // This is a full reference
            const book = findBook(fullBookInput);
            if (!book) {
                lastMatchEndIndex = match.index + match[0].length;
                continue;
            }

            bookName = book.name;
            lastBookName = bookName; // Update context

            chapter = parseInt(match[2], 10);
            verseStart = match[3] ? parseInt(match[3], 10) : undefined;

            if (match[5]) {
                // Cross-chapter range: Book 3:35-4:1
                chapterEnd = parseInt(match[4], 10);
                verseEnd = parseInt(match[5], 10);
            } else {
                // Single verse or single-chapter range: Book 3:35-45
                verseEnd = match[4] ? parseInt(match[4], 10) : undefined;
            }
        } else {
            // This is a shorthand reference
            if (!lastBookName) {
                lastMatchEndIndex = match.index + match[0].length;
                continue; // No context available on this line
            }

            bookName = lastBookName;
            chapter = parseInt(match[6], 10);
            verseStart = parseInt(match[7], 10);

            if (match[9]) {
                // Cross-chapter shorthand: 3:35-4:1
                chapterEnd = parseInt(match[8], 10);
                verseEnd = parseInt(match[9], 10);
            } else {
                // Single verse or single-chapter range shorthand: 3:35-45
                verseEnd = match[8] ? parseInt(match[8], 10) : undefined;
            }
        }

        // Validate the reference before proceeding
        if (!isValidReference(bookName, chapter, verseStart, chapterEnd, verseEnd)) {
            lastMatchEndIndex = match.index + match[0].length;
            continue; // Skip invalid references
        }

        // Ensure we don't match inside existing markdown links
        const beforeMatch = text.substring(0, match.index);
        const afterMatch = text.substring(match.index + match[0].length);

        // Check if this reference is already part of a plugin-managed link structure
        let startIndex = match.index;
        let endIndex = match.index + match[0].length;

        // 1. Check for single link: [Reference](URL)
        const linkMatchBefore = beforeMatch.match(/\[$/);
        const linkMatchAfter = afterMatch.match(/^\]\(([^)]+)\)/);

        if (linkMatchBefore && linkMatchAfter) {
            const url = linkMatchAfter[1];
            if (isPluginManagedUrl(url)) {
                startIndex -= 1; // Include '['
                endIndex += linkMatchAfter[0].length; // Include '](URL)'
            }
        }
        // 2. Check for "Both" structure: Reference ([Logos](URL) | [Bolls](URL))
        else {
            const bothMatchAfter = afterMatch.match(/^ \(\[Logos\]\(([^)]+)\) \| \[Bolls\]\(([^)]+)\)\)/);
            if (bothMatchAfter) {
                const logosUrl = bothMatchAfter[1];
                const bollsUrl = bothMatchAfter[2];
                if (isPluginManagedUrl(logosUrl) || isPluginManagedUrl(bollsUrl)) {
                    endIndex += bothMatchAfter[0].length;
                }
            }
        }

        // If not expanded, check if we're inside a generic markdown link (to skip)
        if (startIndex === match.index && endIndex === match.index + match[0].length) {
            if (isInsideMarkdownLink(beforeMatch, afterMatch)) {
                continue;
            }
        }

        references.push({
            book: bookName,
            chapter,
            verseStart,
            chapterEnd,
            verseEnd,
            rawText,
            startIndex,
            endIndex,
        });

        lastMatchEndIndex = endIndex;
    }

    return references;
}

/**
 * Check if a URL is managed by the Scripture Linker plugin
 */
function isPluginManagedUrl(url: string): boolean {
    return url.includes('ref.ly/') || url.includes('bolls.life/');
}

/**
 * Check if the current position is inside a markdown link
 * @param before Text before the match
 * @param after Text after the match
 * @returns true if inside a markdown link
 */
function isInsideMarkdownLink(before: string, after: string): boolean {
    // Check if we're inside the text part of a markdown link: [text](url)
    // Look for unmatched [ before and ]( after
    const lastOpenBracket = before.lastIndexOf('[');
    const lastCloseBracket = before.lastIndexOf(']');
    const lastOpenParen = before.lastIndexOf('(');

    // If there's an open [ without a matching ], we might be in link text
    if (lastOpenBracket > lastCloseBracket) {
        // Check if there's a ]( after us
        const closeBracketParen = after.indexOf('](');
        if (closeBracketParen !== -1) {
            return true;
        }
    }

    // Check if we're inside the URL part: after ]( and before )
    if (lastOpenParen > lastCloseBracket && lastOpenBracket !== -1) {
        const lastCloseParen = before.lastIndexOf(')');
        if (lastOpenParen > lastCloseParen) {
            // We're after an open paren, check if there's a close paren after
            const nextCloseParen = after.indexOf(')');
            if (nextCloseParen !== -1) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Parse a single reference string into a BibleReference
 * @param text Text containing a single Bible reference
 * @returns The parsed reference or null if not found
 */
export function parseReference(text: string): BibleReference | null {
    const refs = findAllReferences(text);
    return refs.length > 0 ? refs[0] : null;
}

/**
 * Format a Bible reference for display
 * @param ref The Bible reference to format
 * @returns Formatted string like "John 3:16" or "Genesis 1:1-3"
 */
export function formatReference(ref: BibleReference): string {
    let result = `${ref.book} ${ref.chapter}`;

    if (ref.verseStart !== undefined) {
        result += `:${ref.verseStart}`;

        if (ref.chapterEnd !== undefined) {
            result += `-${ref.chapterEnd}:${ref.verseEnd}`;
        } else if (ref.verseEnd !== undefined && ref.verseEnd !== ref.verseStart) {
            result += `-${ref.verseEnd}`;
        }
    }

    return result;
}
