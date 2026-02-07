/**
 * Bible book data with names, abbreviations, and identifiers for URL generation
 */
export interface BibleBook {
    /** Full canonical name */
    name: string;
    /** OSIS abbreviation for Logos URLs */
    osis: string;
    /** Bolls Bible book ID (1-66) */
    bollsId: number;
    /** Array of recognized abbreviations (lowercase for matching) */
    abbreviations: string[];
}

/**
 * Complete list of 66 Bible books with all abbreviation variations
 */
export const BIBLE_BOOKS: BibleBook[] = [
    // Old Testament
    { name: 'Genesis', osis: 'Ge', bollsId: 1, abbreviations: ['genesis', 'gen', 'ge', 'gn'] },
    { name: 'Exodus', osis: 'Ex', bollsId: 2, abbreviations: ['exodus', 'exod', 'exo', 'ex'] },
    { name: 'Leviticus', osis: 'Le', bollsId: 3, abbreviations: ['leviticus', 'lev', 'le', 'lv'] },
    { name: 'Numbers', osis: 'Nu', bollsId: 4, abbreviations: ['numbers', 'num', 'nu', 'nm', 'nb'] },
    { name: 'Deuteronomy', osis: 'Dt', bollsId: 5, abbreviations: ['deuteronomy', 'deut', 'de', 'dt'] },
    { name: 'Joshua', osis: 'Jos', bollsId: 6, abbreviations: ['joshua', 'josh', 'jos', 'jsh'] },
    { name: 'Judges', osis: 'Jdg', bollsId: 7, abbreviations: ['judges', 'judg', 'jdg', 'jg', 'jdgs'] },
    { name: 'Ruth', osis: 'Ru', bollsId: 8, abbreviations: ['ruth', 'rth', 'ru'] },
    { name: '1 Samuel', osis: '1Sa', bollsId: 9, abbreviations: ['1 samuel', '1samuel', '1 sam', '1sam', '1 sa', '1sa', 'i samuel', 'i sam', 'first samuel'] },
    { name: '2 Samuel', osis: '2Sa', bollsId: 10, abbreviations: ['2 samuel', '2samuel', '2 sam', '2sam', '2 sa', '2sa', 'ii samuel', 'ii sam', 'second samuel'] },
    { name: '1 Kings', osis: '1Ki', bollsId: 11, abbreviations: ['1 kings', '1kings', '1 kgs', '1kgs', '1 ki', '1ki', 'i kings', 'i kgs', 'first kings'] },
    { name: '2 Kings', osis: '2Ki', bollsId: 12, abbreviations: ['2 kings', '2kings', '2 kgs', '2kgs', '2 ki', '2ki', 'ii kings', 'ii kgs', 'second kings'] },
    { name: '1 Chronicles', osis: '1Ch', bollsId: 13, abbreviations: ['1 chronicles', '1chronicles', '1 chron', '1chron', '1 chr', '1chr', '1 ch', '1ch', 'i chronicles', 'i chron', 'first chronicles'] },
    { name: '2 Chronicles', osis: '2Ch', bollsId: 14, abbreviations: ['2 chronicles', '2chronicles', '2 chron', '2chron', '2 chr', '2chr', '2 ch', '2ch', 'ii chronicles', 'ii chron', 'second chronicles'] },
    { name: 'Ezra', osis: 'Ezr', bollsId: 15, abbreviations: ['ezra', 'ezr', 'ez'] },
    { name: 'Nehemiah', osis: 'Ne', bollsId: 16, abbreviations: ['nehemiah', 'neh', 'ne'] },
    { name: 'Esther', osis: 'Es', bollsId: 17, abbreviations: ['esther', 'esth', 'est', 'es'] },
    { name: 'Job', osis: 'Job', bollsId: 18, abbreviations: ['job', 'jb'] },
    { name: 'Psalm', osis: 'Ps', bollsId: 19, abbreviations: ['psalm', 'psalms', 'ps', 'psa', 'psm', 'pss'] },
    { name: 'Proverbs', osis: 'Pr', bollsId: 20, abbreviations: ['proverbs', 'prov', 'pro', 'prv', 'pr'] },
    { name: 'Ecclesiastes', osis: 'Ec', bollsId: 21, abbreviations: ['ecclesiastes', 'eccl', 'ecc', 'ec', 'qoh', 'qoheleth'] },
    { name: 'Song of Solomon', osis: 'So', bollsId: 22, abbreviations: ['song of solomon', 'song of songs', 'song', 'sos', 'so', 'canticles', 'canticle', 'cant'] },
    { name: 'Isaiah', osis: 'Is', bollsId: 23, abbreviations: ['isaiah', 'isa', 'is'] },
    { name: 'Jeremiah', osis: 'Je', bollsId: 24, abbreviations: ['jeremiah', 'jer', 'je', 'jr'] },
    { name: 'Lamentations', osis: 'La', bollsId: 25, abbreviations: ['lamentations', 'lam', 'la'] },
    { name: 'Ezekiel', osis: 'Eze', bollsId: 26, abbreviations: ['ezekiel', 'ezek', 'eze', 'ezk'] },
    { name: 'Daniel', osis: 'Da', bollsId: 27, abbreviations: ['daniel', 'dan', 'da', 'dn'] },
    { name: 'Hosea', osis: 'Ho', bollsId: 28, abbreviations: ['hosea', 'hos', 'ho'] },
    { name: 'Joel', osis: 'Joe', bollsId: 29, abbreviations: ['joel', 'joe', 'jl'] },
    { name: 'Amos', osis: 'Am', bollsId: 30, abbreviations: ['amos', 'am'] },
    { name: 'Obadiah', osis: 'Ob', bollsId: 31, abbreviations: ['obadiah', 'obad', 'ob'] },
    { name: 'Jonah', osis: 'Jon', bollsId: 32, abbreviations: ['jonah', 'jon', 'jnh'] },
    { name: 'Micah', osis: 'Mic', bollsId: 33, abbreviations: ['micah', 'mic', 'mc'] },
    { name: 'Nahum', osis: 'Na', bollsId: 34, abbreviations: ['nahum', 'nah', 'na'] },
    { name: 'Habakkuk', osis: 'Hab', bollsId: 35, abbreviations: ['habakkuk', 'hab', 'hb'] },
    { name: 'Zephaniah', osis: 'Zep', bollsId: 36, abbreviations: ['zephaniah', 'zeph', 'zep', 'zp'] },
    { name: 'Haggai', osis: 'Hag', bollsId: 37, abbreviations: ['haggai', 'hag', 'hg'] },
    { name: 'Zechariah', osis: 'Zec', bollsId: 38, abbreviations: ['zechariah', 'zech', 'zec', 'zc'] },
    { name: 'Malachi', osis: 'Mal', bollsId: 39, abbreviations: ['malachi', 'mal', 'ml'] },

    // New Testament
    { name: 'Matthew', osis: 'Mt', bollsId: 40, abbreviations: ['matthew', 'matt', 'mat', 'mt'] },
    { name: 'Mark', osis: 'Mk', bollsId: 41, abbreviations: ['mark', 'mrk', 'mar', 'mk', 'mr'] },
    { name: 'Luke', osis: 'Lk', bollsId: 42, abbreviations: ['luke', 'luk', 'lk'] },
    { name: 'John', osis: 'Jn', bollsId: 43, abbreviations: ['john', 'joh', 'jhn', 'jn'] },
    { name: 'Acts', osis: 'Ac', bollsId: 44, abbreviations: ['acts', 'act', 'ac'] },
    { name: 'Romans', osis: 'Ro', bollsId: 45, abbreviations: ['romans', 'rom', 'ro', 'rm'] },
    { name: '1 Corinthians', osis: '1Co', bollsId: 46, abbreviations: ['1 corinthians', '1corinthians', '1 cor', '1cor', '1 co', '1co', 'i corinthians', 'i cor', 'first corinthians'] },
    { name: '2 Corinthians', osis: '2Co', bollsId: 47, abbreviations: ['2 corinthians', '2corinthians', '2 cor', '2cor', '2 co', '2co', 'ii corinthians', 'ii cor', 'second corinthians'] },
    { name: 'Galatians', osis: 'Ga', bollsId: 48, abbreviations: ['galatians', 'gal', 'ga'] },
    { name: 'Ephesians', osis: 'Eph', bollsId: 49, abbreviations: ['ephesians', 'eph', 'ephes'] },
    { name: 'Philippians', osis: 'Php', bollsId: 50, abbreviations: ['philippians', 'phil', 'php', 'pp'] },
    { name: 'Colossians', osis: 'Col', bollsId: 51, abbreviations: ['colossians', 'col', 'co'] },
    { name: '1 Thessalonians', osis: '1Th', bollsId: 52, abbreviations: ['1 thessalonians', '1thessalonians', '1 thess', '1thess', '1 thes', '1thes', '1 th', '1th', 'i thessalonians', 'i thess', 'first thessalonians'] },
    { name: '2 Thessalonians', osis: '2Th', bollsId: 53, abbreviations: ['2 thessalonians', '2thessalonians', '2 thess', '2thess', '2 thes', '2thes', '2 th', '2th', 'ii thessalonians', 'ii thess', 'second thessalonians'] },
    { name: '1 Timothy', osis: '1Ti', bollsId: 54, abbreviations: ['1 timothy', '1timothy', '1 tim', '1tim', '1 ti', '1ti', 'i timothy', 'i tim', 'first timothy'] },
    { name: '2 Timothy', osis: '2Ti', bollsId: 55, abbreviations: ['2 timothy', '2timothy', '2 tim', '2tim', '2 ti', '2ti', 'ii timothy', 'ii tim', 'second timothy'] },
    { name: 'Titus', osis: 'Tt', bollsId: 56, abbreviations: ['titus', 'tit', 'ti'] },
    { name: 'Philemon', osis: 'Phm', bollsId: 57, abbreviations: ['philemon', 'philem', 'phlm', 'phm', 'pm'] },
    { name: 'Hebrews', osis: 'Heb', bollsId: 58, abbreviations: ['hebrews', 'heb', 'he'] },
    { name: 'James', osis: 'Jas', bollsId: 59, abbreviations: ['james', 'jas', 'jm'] },
    { name: '1 Peter', osis: '1Pe', bollsId: 60, abbreviations: ['1 peter', '1peter', '1 pet', '1pet', '1 pe', '1pe', '1 pt', '1pt', 'i peter', 'i pet', 'first peter'] },
    { name: '2 Peter', osis: '2Pe', bollsId: 61, abbreviations: ['2 peter', '2peter', '2 pet', '2pet', '2 pe', '2pe', '2 pt', '2pt', 'ii peter', 'ii pet', 'second peter'] },
    { name: '1 John', osis: '1Jn', bollsId: 62, abbreviations: ['1 john', '1john', '1 jn', '1jn', '1 jhn', '1jhn', '1 jo', '1jo', 'i john', 'i jn', 'first john'] },
    { name: '2 John', osis: '2Jn', bollsId: 63, abbreviations: ['2 john', '2john', '2 jn', '2jn', '2 jhn', '2jhn', '2 jo', '2jo', 'ii john', 'ii jn', 'second john'] },
    { name: '3 John', osis: '3Jn', bollsId: 64, abbreviations: ['3 john', '3john', '3 jn', '3jn', '3 jhn', '3jhn', '3 jo', '3jo', 'iii john', 'iii jn', 'third john'] },
    { name: 'Jude', osis: 'Jud', bollsId: 65, abbreviations: ['jude', 'jud', 'jd'] },
    { name: 'Revelation', osis: 'Re', bollsId: 66, abbreviations: ['revelation', 'revelations', 'rev', 're', 'rv', 'apocalypse'] },
];

// ============================================================================
// Performance Optimization: Caching
// ============================================================================

/** Cached abbreviation lookup map for O(1) book lookups */
let abbreviationMap: Map<string, BibleBook> | null = null;

/** Cached book pattern for regex matching */
let cachedBookPattern: string | null = null;

/**
 * Build the abbreviation lookup map (computed once, cached)
 */
function getAbbreviationMap(): Map<string, BibleBook> {
    if (abbreviationMap) return abbreviationMap;

    abbreviationMap = new Map();
    for (const book of BIBLE_BOOKS) {
        for (const abbrev of book.abbreviations) {
            abbreviationMap.set(abbrev, book);
        }
    }
    return abbreviationMap;
}

/**
 * Find a Bible book by name or abbreviation
 * Uses cached lookup map for O(1) performance
 * @param input The book name or abbreviation to search for
 * @returns The matching BibleBook or undefined
 */
export function findBook(input: string): BibleBook | undefined {
    const normalized = input.toLowerCase().replace(/\./g, '').trim();
    return getAbbreviationMap().get(normalized);
}

/**
 * Build a regex pattern that matches all book names and abbreviations
 * Pattern is cached after first computation
 * @returns A regex pattern string
 */
export function buildBookPattern(): string {
    if (cachedBookPattern) return cachedBookPattern;

    const allNames: string[] = [];

    for (const book of BIBLE_BOOKS) {
        // Add full name
        allNames.push(escapeRegex(book.name));
        // Add all abbreviations
        for (const abbrev of book.abbreviations) {
            allNames.push(escapeRegex(abbrev));
        }
    }

    // Sort by length descending so longer matches are tried first
    // This ensures "1 John" matches before "John"
    allNames.sort((a, b) => b.length - a.length);

    cachedBookPattern = allNames.join('|');
    return cachedBookPattern;
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Clear all caches (useful for testing)
 */
export function clearCaches(): void {
    abbreviationMap = null;
    cachedBookPattern = null;
}

