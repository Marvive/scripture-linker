import { BibleReference, Translation, TRANSLATION_CONFIG } from './types';
import { findBook } from './bibleBooks';

/**
 * Generate a Logos Bible Software ref.ly URL for a Bible reference
 * Format: https://ref.ly/logosres/{resource}?ref={bibleRef}.{Book}{Chapter}.{Verse}
 * Example: https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16
 */
export function generateLogosUrl(ref: BibleReference, translation: Translation): string {
    const config = TRANSLATION_CONFIG[translation];
    const book = findBook(ref.book);

    if (!book) {
        console.warn(`Could not find book for: ${ref.book}`);
        return '';
    }

    // Special handling for semicolon format (LSB, KJV 1900): https://ref.ly/Ge1;kjv1900
    if (translation === 'LSB' || translation === 'KJV') {
        let refString = `${book.osis}${ref.chapter}`;
        if (ref.verseStart !== undefined) {
            refString += `.${ref.verseStart}`;
            if (ref.verseEnd !== undefined && ref.verseEnd !== ref.verseStart) {
                refString += `-${ref.verseEnd}`;
            }
        }
        return `https://ref.ly/${refString};${config.logosResource}`;
    }

    // Default Logos ref.ly format
    let refString = '';

    if (translation === 'MSG') {
        // MSG format: https://ref.ly/logosres/message?ref=Bible.1Sa10.7
        refString = `${config.logosBibleRef}.${book.osis}${ref.chapter}`;
    } else {
        // Standard format: https://ref.ly/logosres/{resource}?ref=Bible{TRANS}.{Book}{Chapter}.{Verse}
        refString = `${config.logosBibleRef}.${book.osis}${ref.chapter}`;
    }

    if (ref.verseStart !== undefined) {
        refString += `.${ref.verseStart}`;
        if (ref.verseEnd !== undefined && ref.verseEnd !== ref.verseStart) {
            refString += `-${ref.verseEnd}`;
        }
    }

    return `https://ref.ly/logosres/${config.logosResource}?ref=${refString}`;
}

/**
 * Generate a Bolls Bible URL for a Bible reference
 * Format: https://bolls.life/{TRANSLATION}/{BOOK_ID}/{CHAPTER}/#{VERSE}
 * Example: https://bolls.life/ESV/43/3/#16
 */
export function generateBollsUrl(ref: BibleReference, translation: Translation): string {
    const config = TRANSLATION_CONFIG[translation];
    const book = findBook(ref.book);

    if (!book) {
        console.warn(`Could not find book for: ${ref.book}`);
        return '';
    }

    let url = `https://bolls.life/${config.bollsCode}/${book.bollsId}/${ref.chapter}/`;

    // Add verse anchor if specific verse is referenced
    if (ref.verseStart !== undefined) {
        url += `#${ref.verseStart}`;
    }

    return url;
}

/**
 * Generate a markdown link for a Bible reference
 * @param ref The Bible reference
 * @param translation The translation to use
 * @param service Which service URL to generate ('logos' or 'bolls')
 * @returns Markdown link string
 */
export function generateMarkdownLink(
    ref: BibleReference,
    translation: Translation,
    service: 'logos' | 'bolls'
): string {
    const url = service === 'logos'
        ? generateLogosUrl(ref, translation)
        : generateBollsUrl(ref, translation);

    if (!url) return ref.rawText;

    return `[${ref.rawText}](${url})`;
}

/**
 * Generate markdown links for both services
 * @param ref The Bible reference
 * @param translation The translation to use
 * @returns Combined markdown links
 */
export function generateBothLinks(ref: BibleReference, translation: Translation): string {
    const logosUrl = generateLogosUrl(ref, translation);
    const bollsUrl = generateBollsUrl(ref, translation);

    if (!logosUrl && !bollsUrl) return ref.rawText;

    const links: string[] = [];

    if (logosUrl) {
        links.push(`[Logos](${logosUrl})`);
    }
    if (bollsUrl) {
        links.push(`[Bolls](${bollsUrl})`);
    }

    return `${ref.rawText} (${links.join(' | ')})`;
}
