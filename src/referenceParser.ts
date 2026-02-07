import { BibleReference } from './types';
import { findBook, buildBookPattern } from './bibleBooks';

/** Cached compiled regex for reference matching */
let cachedReferenceRegex: RegExp | null = null;

/**
 * Get the reference regex (cached after first computation)
 */
function getReferenceRegex(): RegExp {
    if (cachedReferenceRegex) return new RegExp(cachedReferenceRegex.source, cachedReferenceRegex.flags);

    const bookPattern = buildBookPattern();
    const fullRefPattern = `(${bookPattern})\\.?\\s*(\\d{1,3})(?:[:.](\\d{1,3})(?:[-–—](\\d{1,3}))?)?`;
    const shorthandRefPattern = `(?:\\()?(\\d{1,3}):(\\d{1,3})(?:[-–—](\\d{1,3}))?(?:\\))?`;

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

    while ((match = combinedRegex.exec(text)) !== null) {
        const fullBookInput = match[1];
        let bookName: string | null = null;
        let chapter: number;
        let verseStart: number | undefined;
        let verseEnd: number | undefined;
        let rawText = match[0];

        if (fullBookInput) {
            // This is a full reference
            const book = findBook(fullBookInput);
            if (!book) continue;

            bookName = book.name;
            lastBookName = bookName; // Update context

            chapter = parseInt(match[2], 10);
            verseStart = match[3] ? parseInt(match[3], 10) : undefined;
            verseEnd = match[4] ? parseInt(match[4], 10) : undefined;
        } else {
            // This is a shorthand reference (match[5], match[6], match[7])
            if (!lastBookName) continue; // No context available

            bookName = lastBookName;
            chapter = parseInt(match[5], 10);
            verseStart = parseInt(match[6], 10);
            verseEnd = match[7] ? parseInt(match[7], 10) : undefined;

            // For shorthand, if it was wrapped in parens, we might want to strip them for rawText
            // but the regex captures them. If we want rawText to be exactly what's in the document:
            // rawText is already correctly match[0].
        }

        // Ensure we don't match inside existing markdown links
        const beforeMatch = text.substring(0, match.index);
        const afterMatch = text.substring(match.index + match[0].length);

        if (isInsideMarkdownLink(beforeMatch, afterMatch)) {
            continue;
        }

        references.push({
            book: bookName,
            chapter,
            verseStart,
            verseEnd,
            rawText,
            startIndex: match.index,
            endIndex: match.index + match[0].length,
        });
    }

    return references;
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
        if (ref.verseEnd !== undefined && ref.verseEnd !== ref.verseStart) {
            result += `-${ref.verseEnd}`;
        }
    }

    return result;
}
