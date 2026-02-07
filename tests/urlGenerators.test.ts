import { generateLogosUrl, generateBollsUrl, generateMarkdownLink, generateBothLinks } from '../src/urlGenerators';
import { BibleReference } from '../src/types';

const createRef = (book: string, chapter: number, verseStart?: number, verseEnd?: number): BibleReference => ({
    book,
    chapter,
    verseStart,
    verseEnd,
    rawText: `${book} ${chapter}${verseStart ? `:${verseStart}` : ''}${verseEnd ? `-${verseEnd}` : ''}`,
    startIndex: 0,
    endIndex: 10
});

describe('generateLogosUrl', () => {
    describe('Standard Format', () => {
        it('should generate ESV URL correctly', () => {
            const ref = createRef('John', 3, 16);
            const url = generateLogosUrl(ref, 'ESV');
            expect(url).toBe('https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16');
        });

        it('should generate NASB95 URL correctly', () => {
            const ref = createRef('Genesis', 1, 1);
            const url = generateLogosUrl(ref, 'NASB95');
            expect(url).toBe('https://ref.ly/logosres/nasb95?ref=BibleNASB95.Ge1.1');
        });

        it('should generate NIV 2011 URL correctly', () => {
            const ref = createRef('Romans', 8, 28);
            const url = generateLogosUrl(ref, 'NIV');
            expect(url).toBe('https://ref.ly/logosres/niv2011?ref=BibleNIV.Ro8.28');
        });

        it('should generate NKJV URL correctly', () => {
            const ref = createRef('Psalm', 23, 1);
            const url = generateLogosUrl(ref, 'NKJV');
            expect(url).toBe('https://ref.ly/logosres/nkjv?ref=BibleNKJV.Ps23.1');
        });

        it('should handle verse ranges', () => {
            const ref = createRef('1 Corinthians', 13, 4, 8);
            const url = generateLogosUrl(ref, 'ESV');
            expect(url).toBe('https://ref.ly/logosres/esv?ref=BibleESV.1Co13.4-8');
        });

        it('should handle chapter-only references', () => {
            const ref = createRef('Psalm', 23);
            const url = generateLogosUrl(ref, 'ESV');
            expect(url).toBe('https://ref.ly/logosres/esv?ref=BibleESV.Ps23');
        });
    });

    describe('Semicolon Format (LSB, KJV)', () => {
        it('should generate LSB URL with semicolon format', () => {
            const ref = createRef('1 Samuel', 13, 5);
            const url = generateLogosUrl(ref, 'LSB');
            expect(url).toBe('https://ref.ly/1Sa13.5;lgcystndrdbblsb');
        });

        it('should generate KJV 1900 URL with semicolon format', () => {
            const ref = createRef('Genesis', 1);
            const url = generateLogosUrl(ref, 'KJV');
            expect(url).toBe('https://ref.ly/Ge1;kjv1900');
        });

        it('should handle verse ranges in semicolon format', () => {
            const ref = createRef('1 Samuel', 10, 7, 10);
            const url = generateLogosUrl(ref, 'LSB');
            expect(url).toBe('https://ref.ly/1Sa10.7-10;lgcystndrdbblsb');
        });
    });

    describe('MSG Format', () => {
        it('should generate MSG URL correctly', () => {
            const ref = createRef('1 Samuel', 10, 7);
            const url = generateLogosUrl(ref, 'MSG');
            expect(url).toBe('https://ref.ly/logosres/message?ref=Bible.1Sa10.7');
        });
    });

    describe('LEB Format', () => {
        it('should generate LEB URL correctly', () => {
            const ref = createRef('John', 1, 1);
            const url = generateLogosUrl(ref, 'LEB');
            expect(url).toBe('https://ref.ly/logosres/leb?ref=BibleLEB.Jn1.1');
        });
    });

    describe('Error Handling', () => {
        it('should return empty string for unknown book', () => {
            const ref = createRef('FakeBook', 1, 1);
            const url = generateLogosUrl(ref, 'ESV');
            expect(url).toBe('');
        });
    });
});

describe('generateBollsUrl', () => {
    it('should generate correct Bolls URL for John', () => {
        const ref = createRef('John', 3, 16);
        const url = generateBollsUrl(ref, 'ESV');
        expect(url).toBe('https://bolls.life/ESV/43/3/#16');
    });

    it('should generate correct Bolls URL for Genesis', () => {
        const ref = createRef('Genesis', 1, 1);
        const url = generateBollsUrl(ref, 'NIV');
        expect(url).toBe('https://bolls.life/NIV/1/1/#1');
    });

    it('should handle chapter-only references', () => {
        const ref = createRef('Psalm', 23);
        const url = generateBollsUrl(ref, 'ESV');
        expect(url).toBe('https://bolls.life/ESV/19/23/');
    });

    it('should use NASB code for NASB95', () => {
        const ref = createRef('Romans', 8, 28);
        const url = generateBollsUrl(ref, 'NASB95');
        expect(url).toBe('https://bolls.life/NASB/45/8/#28');
    });
});

describe('generateMarkdownLink', () => {
    it('should generate Logos markdown link', () => {
        const ref = createRef('John', 3, 16);
        const link = generateMarkdownLink(ref, 'ESV', 'logos');
        expect(link).toContain('[John 3:16]');
        expect(link).toContain('ref.ly');
    });

    it('should generate Bolls markdown link', () => {
        const ref = createRef('John', 3, 16);
        const link = generateMarkdownLink(ref, 'ESV', 'bolls');
        expect(link).toContain('[John 3:16]');
        expect(link).toContain('bolls.life');
    });
});

describe('generateBothLinks', () => {
    it('should generate combined links for both services', () => {
        const ref = createRef('John', 3, 16);
        const result = generateBothLinks(ref, 'ESV');
        expect(result).toContain('John 3:16');
        expect(result).toContain('[Logos]');
        expect(result).toContain('[Bolls]');
        expect(result).toContain('|');
    });
});
