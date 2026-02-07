/**
 * Represents a parsed Bible reference
 */
export interface BibleReference {
    /** The standardized book name (e.g., "Genesis", "1 John") */
    book: string;
    /** The chapter number */
    chapter: number;
    /** The starting verse number (undefined if whole chapter) */
    verseStart?: number;
    /** The ending verse number for ranges (undefined if single verse) */
    verseEnd?: number;
    /** The original text that was matched */
    rawText: string;
    /** Start position in the source text */
    startIndex: number;
    /** End position in the source text */
    endIndex: number;
}

/**
 * Supported Bible translations
 */
export type Translation = 'ESV' | 'NASB95' | 'NIV' | 'MSG' | 'LSB' | 'LEB' | 'KJV' | 'NKJV';

/**
 * Link service options
 */
export type LinkService = 'logos' | 'bolls' | 'both';

/**
 * Plugin settings
 */
export interface ScriptureLinkerSettings {
    /** Default translation to use for links */
    defaultTranslation: Translation;
    /** Which link service to use */
    linkService: LinkService;
    /** Whether to show both Logos and Bolls links when 'both' is selected */
    showBothLinks: boolean;
}

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: ScriptureLinkerSettings = {
    defaultTranslation: 'ESV',
    linkService: 'logos',
    showBothLinks: false,
};

/**
 * Translation configuration for URL generation
 */
export interface TranslationConfig {
    /** Logos resource code (lowercase) */
    logosResource: string;
    /** Logos Bible reference prefix */
    logosBibleRef: string;
    /** Bolls Bible translation code */
    bollsCode: string;
    /** Whether translation is supported by Bolls Bible */
    supportsBolls: boolean;
}

/**
 * Translation mappings
 */
export const TRANSLATION_CONFIG: Record<Translation, TranslationConfig> = {
    ESV: {
        logosResource: 'esv',
        logosBibleRef: 'BibleESV',
        bollsCode: 'ESV',
        supportsBolls: true,
    },
    NASB95: {
        logosResource: 'nasb95',
        logosBibleRef: 'BibleNASB95',
        bollsCode: 'NASB',
        supportsBolls: true,
    },
    NIV: {
        logosResource: 'niv2011',
        logosBibleRef: 'BibleNIV',
        bollsCode: 'NIV',
        supportsBolls: true,
    },
    MSG: {
        logosResource: 'message',
        logosBibleRef: 'Bible', // MSG uses Bible.1Sa10.7 format
        bollsCode: 'MSG',
        supportsBolls: true,
    },
    LSB: {
        logosResource: 'lgcystndrdbblsb', // LSB uses special pattern
        logosBibleRef: 'BibleLSB',
        bollsCode: 'LSB',
        supportsBolls: true,
    },
    LEB: {
        logosResource: 'leb',
        logosBibleRef: 'BibleLEB',
        bollsCode: 'LEB',
        supportsBolls: false,
    },
    KJV: {
        logosResource: 'kjv1900',
        logosBibleRef: 'BibleKJV',
        bollsCode: 'KJV',
        supportsBolls: true,
    },
    NKJV: {
        logosResource: 'nkjv',
        logosBibleRef: 'BibleNKJV',
        bollsCode: 'NKJV',
        supportsBolls: true,
    },
};

