/**
 * Bible book data with names, abbreviations, identifiers for URL generation, and validation data
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
    /** Total number of chapters in the book */
    chapters: number;
    /** Number of verses in each chapter (1-indexed internally, array is 0-indexed) */
    versesPerChapter: number[];
}

/**
 * Complete list of 66 Bible books with all abbreviation variations and verse counts
 * Verse counts are based on the ESV translation
 */
export const BIBLE_BOOKS: BibleBook[] = [
    // Old Testament
    { name: 'Genesis', osis: 'Ge', bollsId: 1, abbreviations: ['genesis', 'gen', 'ge', 'gn'], chapters: 50, versesPerChapter: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26] },
    { name: 'Exodus', osis: 'Ex', bollsId: 2, abbreviations: ['exodus', 'exod', 'exo', 'ex'], chapters: 40, versesPerChapter: [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38] },
    { name: 'Leviticus', osis: 'Le', bollsId: 3, abbreviations: ['leviticus', 'lev', 'le', 'lv'], chapters: 27, versesPerChapter: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34] },
    { name: 'Numbers', osis: 'Nu', bollsId: 4, abbreviations: ['numbers', 'num', 'nu', 'nm', 'nb'], chapters: 36, versesPerChapter: [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13] },
    { name: 'Deuteronomy', osis: 'Dt', bollsId: 5, abbreviations: ['deuteronomy', 'deut', 'de', 'dt'], chapters: 34, versesPerChapter: [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12] },
    { name: 'Joshua', osis: 'Jos', bollsId: 6, abbreviations: ['joshua', 'josh', 'jos', 'jsh'], chapters: 24, versesPerChapter: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33] },
    { name: 'Judges', osis: 'Jdg', bollsId: 7, abbreviations: ['judges', 'judg', 'jdg', 'jg', 'jdgs'], chapters: 21, versesPerChapter: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25] },
    { name: 'Ruth', osis: 'Ru', bollsId: 8, abbreviations: ['ruth', 'rth', 'ru'], chapters: 4, versesPerChapter: [22, 23, 18, 22] },
    { name: '1 Samuel', osis: '1Sa', bollsId: 9, abbreviations: ['1 samuel', '1samuel', '1 sam', '1sam', '1 sa', '1sa', 'i samuel', 'i sam', 'first samuel'], chapters: 31, versesPerChapter: [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13] },
    { name: '2 Samuel', osis: '2Sa', bollsId: 10, abbreviations: ['2 samuel', '2samuel', '2 sam', '2sam', '2 sa', '2sa', 'ii samuel', 'ii sam', 'second samuel'], chapters: 24, versesPerChapter: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25] },
    { name: '1 Kings', osis: '1Ki', bollsId: 11, abbreviations: ['1 kings', '1kings', '1 kgs', '1kgs', '1 ki', '1ki', 'i kings', 'i kgs', 'first kings'], chapters: 22, versesPerChapter: [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53] },
    { name: '2 Kings', osis: '2Ki', bollsId: 12, abbreviations: ['2 kings', '2kings', '2 kgs', '2kgs', '2 ki', '2ki', 'ii kings', 'ii kgs', 'second kings'], chapters: 25, versesPerChapter: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30] },
    { name: '1 Chronicles', osis: '1Ch', bollsId: 13, abbreviations: ['1 chronicles', '1chronicles', '1 chron', '1chron', '1 chr', '1chr', '1 ch', '1ch', 'i chronicles', 'i chron', 'first chronicles'], chapters: 29, versesPerChapter: [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30] },
    { name: '2 Chronicles', osis: '2Ch', bollsId: 14, abbreviations: ['2 chronicles', '2chronicles', '2 chron', '2chron', '2 chr', '2chr', '2 ch', '2ch', 'ii chronicles', 'ii chron', 'second chronicles'], chapters: 36, versesPerChapter: [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23] },
    { name: 'Ezra', osis: 'Ezr', bollsId: 15, abbreviations: ['ezra', 'ezr', 'ez'], chapters: 10, versesPerChapter: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44] },
    { name: 'Nehemiah', osis: 'Ne', bollsId: 16, abbreviations: ['nehemiah', 'neh', 'ne'], chapters: 13, versesPerChapter: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31] },
    { name: 'Esther', osis: 'Es', bollsId: 17, abbreviations: ['esther', 'esth', 'est', 'es'], chapters: 10, versesPerChapter: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3] },
    { name: 'Job', osis: 'Job', bollsId: 18, abbreviations: ['job', 'jb'], chapters: 42, versesPerChapter: [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17] },
    { name: 'Psalm', osis: 'Ps', bollsId: 19, abbreviations: ['psalm', 'psalms', 'ps', 'psa', 'psm', 'pss'], chapters: 150, versesPerChapter: [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6] },
    { name: 'Proverbs', osis: 'Pr', bollsId: 20, abbreviations: ['proverbs', 'prov', 'pro', 'prv', 'pr'], chapters: 31, versesPerChapter: [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31] },
    { name: 'Ecclesiastes', osis: 'Ec', bollsId: 21, abbreviations: ['ecclesiastes', 'eccl', 'ecc', 'ec', 'qoh', 'qoheleth'], chapters: 12, versesPerChapter: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14] },
    { name: 'Song of Solomon', osis: 'So', bollsId: 22, abbreviations: ['song of solomon', 'song of songs', 'song', 'sos', 'so', 'canticles', 'canticle', 'cant'], chapters: 8, versesPerChapter: [17, 17, 11, 16, 16, 13, 13, 14] },
    { name: 'Isaiah', osis: 'Is', bollsId: 23, abbreviations: ['isaiah', 'isa', 'is'], chapters: 66, versesPerChapter: [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24] },
    { name: 'Jeremiah', osis: 'Je', bollsId: 24, abbreviations: ['jeremiah', 'jer', 'je', 'jr'], chapters: 52, versesPerChapter: [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34] },
    { name: 'Lamentations', osis: 'La', bollsId: 25, abbreviations: ['lamentations', 'lam', 'la'], chapters: 5, versesPerChapter: [22, 22, 66, 22, 22] },
    { name: 'Ezekiel', osis: 'Eze', bollsId: 26, abbreviations: ['ezekiel', 'ezek', 'eze', 'ezk'], chapters: 48, versesPerChapter: [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35] },
    { name: 'Daniel', osis: 'Da', bollsId: 27, abbreviations: ['daniel', 'dan', 'da', 'dn'], chapters: 12, versesPerChapter: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13] },
    { name: 'Hosea', osis: 'Ho', bollsId: 28, abbreviations: ['hosea', 'hos', 'ho'], chapters: 14, versesPerChapter: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9] },
    { name: 'Joel', osis: 'Joe', bollsId: 29, abbreviations: ['joel', 'joe', 'jl'], chapters: 3, versesPerChapter: [20, 32, 21] },
    { name: 'Amos', osis: 'Am', bollsId: 30, abbreviations: ['amos', 'am'], chapters: 9, versesPerChapter: [15, 16, 15, 13, 27, 14, 17, 14, 15] },
    { name: 'Obadiah', osis: 'Ob', bollsId: 31, abbreviations: ['obadiah', 'obad', 'ob'], chapters: 1, versesPerChapter: [21] },
    { name: 'Jonah', osis: 'Jon', bollsId: 32, abbreviations: ['jonah', 'jon', 'jnh'], chapters: 4, versesPerChapter: [17, 10, 10, 11] },
    { name: 'Micah', osis: 'Mic', bollsId: 33, abbreviations: ['micah', 'mic', 'mc'], chapters: 7, versesPerChapter: [16, 13, 12, 13, 15, 16, 20] },
    { name: 'Nahum', osis: 'Na', bollsId: 34, abbreviations: ['nahum', 'nah', 'na'], chapters: 3, versesPerChapter: [15, 14, 19] },
    { name: 'Habakkuk', osis: 'Hab', bollsId: 35, abbreviations: ['habakkuk', 'hab', 'hb'], chapters: 3, versesPerChapter: [17, 20, 19] },
    { name: 'Zephaniah', osis: 'Zep', bollsId: 36, abbreviations: ['zephaniah', 'zeph', 'zep', 'zp'], chapters: 3, versesPerChapter: [18, 15, 20] },
    { name: 'Haggai', osis: 'Hag', bollsId: 37, abbreviations: ['haggai', 'hag', 'hg'], chapters: 2, versesPerChapter: [15, 23] },
    { name: 'Zechariah', osis: 'Zec', bollsId: 38, abbreviations: ['zechariah', 'zech', 'zec', 'zc'], chapters: 14, versesPerChapter: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21] },
    { name: 'Malachi', osis: 'Mal', bollsId: 39, abbreviations: ['malachi', 'mal', 'ml'], chapters: 4, versesPerChapter: [14, 17, 18, 6] },

    // New Testament
    { name: 'Matthew', osis: 'Mt', bollsId: 40, abbreviations: ['matthew', 'matt', 'mat', 'mt'], chapters: 28, versesPerChapter: [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20] },
    { name: 'Mark', osis: 'Mk', bollsId: 41, abbreviations: ['mark', 'mrk', 'mar', 'mk', 'mr'], chapters: 16, versesPerChapter: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20] },
    { name: 'Luke', osis: 'Lk', bollsId: 42, abbreviations: ['luke', 'luk', 'lk'], chapters: 24, versesPerChapter: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53] },
    { name: 'John', osis: 'Jn', bollsId: 43, abbreviations: ['john', 'joh', 'jhn', 'jn'], chapters: 21, versesPerChapter: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25] },
    { name: 'Acts', osis: 'Ac', bollsId: 44, abbreviations: ['acts', 'act', 'ac'], chapters: 28, versesPerChapter: [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31] },
    { name: 'Romans', osis: 'Ro', bollsId: 45, abbreviations: ['romans', 'rom', 'ro', 'rm'], chapters: 16, versesPerChapter: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27] },
    { name: '1 Corinthians', osis: '1Co', bollsId: 46, abbreviations: ['1 corinthians', '1corinthians', '1 cor', '1cor', '1 co', '1co', 'i corinthians', 'i cor', 'first corinthians'], chapters: 16, versesPerChapter: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24] },
    { name: '2 Corinthians', osis: '2Co', bollsId: 47, abbreviations: ['2 corinthians', '2corinthians', '2 cor', '2cor', '2 co', '2co', 'ii corinthians', 'ii cor', 'second corinthians'], chapters: 13, versesPerChapter: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14] },
    { name: 'Galatians', osis: 'Ga', bollsId: 48, abbreviations: ['galatians', 'gal', 'ga'], chapters: 6, versesPerChapter: [24, 21, 29, 31, 26, 18] },
    { name: 'Ephesians', osis: 'Eph', bollsId: 49, abbreviations: ['ephesians', 'eph', 'ephes'], chapters: 6, versesPerChapter: [23, 22, 21, 32, 33, 24] },
    { name: 'Philippians', osis: 'Php', bollsId: 50, abbreviations: ['philippians', 'phil', 'php', 'pp'], chapters: 4, versesPerChapter: [30, 30, 21, 23] },
    { name: 'Colossians', osis: 'Col', bollsId: 51, abbreviations: ['colossians', 'col', 'co'], chapters: 4, versesPerChapter: [29, 23, 25, 18] },
    { name: '1 Thessalonians', osis: '1Th', bollsId: 52, abbreviations: ['1 thessalonians', '1thessalonians', '1 thess', '1thess', '1 thes', '1thes', '1 th', '1th', 'i thessalonians', 'i thess', 'first thessalonians'], chapters: 5, versesPerChapter: [10, 20, 13, 18, 28] },
    { name: '2 Thessalonians', osis: '2Th', bollsId: 53, abbreviations: ['2 thessalonians', '2thessalonians', '2 thess', '2thess', '2 thes', '2thes', '2 th', '2th', 'ii thessalonians', 'ii thess', 'second thessalonians'], chapters: 3, versesPerChapter: [12, 17, 18] },
    { name: '1 Timothy', osis: '1Ti', bollsId: 54, abbreviations: ['1 timothy', '1timothy', '1 tim', '1tim', '1 ti', '1ti', 'i timothy', 'i tim', 'first timothy'], chapters: 6, versesPerChapter: [20, 15, 16, 16, 25, 21] },
    { name: '2 Timothy', osis: '2Ti', bollsId: 55, abbreviations: ['2 timothy', '2timothy', '2 tim', '2tim', '2 ti', '2ti', 'ii timothy', 'ii tim', 'second timothy'], chapters: 4, versesPerChapter: [18, 26, 17, 22] },
    { name: 'Titus', osis: 'Tt', bollsId: 56, abbreviations: ['titus', 'tit', 'ti'], chapters: 3, versesPerChapter: [16, 15, 15] },
    { name: 'Philemon', osis: 'Phm', bollsId: 57, abbreviations: ['philemon', 'philem', 'phlm', 'phm', 'pm'], chapters: 1, versesPerChapter: [25] },
    { name: 'Hebrews', osis: 'Heb', bollsId: 58, abbreviations: ['hebrews', 'heb', 'he'], chapters: 13, versesPerChapter: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25] },
    { name: 'James', osis: 'Jas', bollsId: 59, abbreviations: ['james', 'jas', 'jm'], chapters: 5, versesPerChapter: [27, 18, 18, 20, 20] },
    { name: '1 Peter', osis: '1Pe', bollsId: 60, abbreviations: ['1 peter', '1peter', '1 pet', '1pet', '1 pe', '1pe', '1 pt', '1pt', 'i peter', 'i pet', 'first peter'], chapters: 5, versesPerChapter: [25, 25, 22, 19, 14] },
    { name: '2 Peter', osis: '2Pe', bollsId: 61, abbreviations: ['2 peter', '2peter', '2 pet', '2pet', '2 pe', '2pe', '2 pt', '2pt', 'ii peter', 'ii pet', 'second peter'], chapters: 3, versesPerChapter: [21, 22, 18] },
    { name: '1 John', osis: '1Jn', bollsId: 62, abbreviations: ['1 john', '1john', '1 jn', '1jn', '1 jhn', '1jhn', '1 jo', '1jo', 'i john', 'i jn', 'first john'], chapters: 5, versesPerChapter: [10, 29, 24, 21, 21] },
    { name: '2 John', osis: '2Jn', bollsId: 63, abbreviations: ['2 john', '2john', '2 jn', '2jn', '2 jhn', '2jhn', '2 jo', '2jo', 'ii john', 'ii jn', 'second john'], chapters: 1, versesPerChapter: [13] },
    { name: '3 John', osis: '3Jn', bollsId: 64, abbreviations: ['3 john', '3john', '3 jn', '3jn', '3 jhn', '3jhn', '3 jo', '3jo', 'iii john', 'iii jn', 'third john'], chapters: 1, versesPerChapter: [14] },
    { name: 'Jude', osis: 'Jud', bollsId: 65, abbreviations: ['jude', 'jud', 'jd'], chapters: 1, versesPerChapter: [25] },
    { name: 'Revelation', osis: 'Re', bollsId: 66, abbreviations: ['revelation', 'revelations', 'rev', 're', 'rv', 'apocalypse'], chapters: 22, versesPerChapter: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21] },
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
 * Check if a Bible reference is valid (chapter and verse exist)
 * @param bookName The book name
 * @param chapter The chapter number
 * @param verse Optional verse number to validate
 * @param chapterEnd Optional ending chapter for cross-chapter ranges
 * @param verseEnd Optional ending verse number
 * @returns true if the reference is valid
 */
export function isValidReference(
    bookName: string,
    chapter: number,
    verse?: number,
    chapterEnd?: number,
    verseEnd?: number
): boolean {
    const book = findBook(bookName);
    if (!book) return false;

    // Validate starting chapter
    if (chapter < 1 || chapter > book.chapters) return false;

    // Validate starting verse if provided
    if (verse !== undefined) {
        const maxVerse = book.versesPerChapter[chapter - 1];
        if (verse < 1 || verse > maxVerse) return false;
    }

    // Validate ending chapter if provided (cross-chapter range)
    if (chapterEnd !== undefined) {
        if (chapterEnd < 1 || chapterEnd > book.chapters) return false;
        if (chapterEnd < chapter) return false; // End chapter can't be before start

        // Validate ending verse in ending chapter
        if (verseEnd !== undefined) {
            const maxVerseEnd = book.versesPerChapter[chapterEnd - 1];
            if (verseEnd < 1 || verseEnd > maxVerseEnd) return false;
        }
    } else if (verseEnd !== undefined && verse !== undefined) {
        // Single chapter range: validate ending verse in same chapter
        const maxVerse = book.versesPerChapter[chapter - 1];
        if (verseEnd < 1 || verseEnd > maxVerse) return false;
        if (verseEnd < verse) return false; // End verse can't be before start
    }

    return true;
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
