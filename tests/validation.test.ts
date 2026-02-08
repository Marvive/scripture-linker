import { isValidReference, findBook } from '../src/bibleBooks';
import { findAllReferences } from '../src/referenceParser';

describe('Reference Validation', () => {
    describe('isValidReference', () => {
        // Valid references
        it('should accept valid chapter and verse', () => {
            expect(isValidReference('Genesis', 1, 1)).toBe(true);
            expect(isValidReference('Genesis', 50, 26)).toBe(true); // Last verse of Genesis
            expect(isValidReference('John', 3, 16)).toBe(true);
            expect(isValidReference('Psalm', 119, 176)).toBe(true); // Longest chapter
        });

        it('should accept valid chapter-only reference', () => {
            expect(isValidReference('Genesis', 1)).toBe(true);
            expect(isValidReference('Genesis', 50)).toBe(true);
            expect(isValidReference('Revelation', 22)).toBe(true);
        });

        it('should accept valid verse ranges', () => {
            expect(isValidReference('Genesis', 1, 1, undefined, 5)).toBe(true);
            expect(isValidReference('John', 3, 16, undefined, 21)).toBe(true);
        });

        it('should accept valid cross-chapter ranges', () => {
            expect(isValidReference('John', 3, 36, 4, 1)).toBe(true); // John 3:36-4:1
            expect(isValidReference('Genesis', 1, 31, 2, 3)).toBe(true);
        });

        // Invalid chapters
        it('should reject invalid chapters', () => {
            expect(isValidReference('Genesis', 0)).toBe(false); // Chapter 0
            expect(isValidReference('Genesis', 51)).toBe(false); // Genesis has 50 chapters
            expect(isValidReference('John', 22)).toBe(false); // John has 21 chapters
            expect(isValidReference('Jude', 2)).toBe(false); // Jude has 1 chapter
        });

        // Invalid verses
        it('should reject invalid verses', () => {
            expect(isValidReference('Genesis', 1, 0)).toBe(false); // Verse 0
            expect(isValidReference('Genesis', 1, 32)).toBe(false); // Gen 1 has 31 verses
            expect(isValidReference('Genesis', 3, 25)).toBe(false); // Gen 3 has 24 verses
            expect(isValidReference('Genesis', 3, 34)).toBe(false); // User's example
            expect(isValidReference('John', 3, 37)).toBe(false); // John 3 has 36 verses
        });

        // Invalid verse ranges
        it('should reject invalid verse ranges', () => {
            expect(isValidReference('Genesis', 1, 30, undefined, 35)).toBe(false); // End verse out of range
            expect(isValidReference('Genesis', 1, 20, undefined, 10)).toBe(false); // End before start
        });

        // Invalid cross-chapter ranges
        it('should reject invalid cross-chapter ranges', () => {
            expect(isValidReference('Genesis', 3, 34, 4, 1)).toBe(false); // Gen 3:34 doesn't exist
            expect(isValidReference('John', 21, 25, 22, 1)).toBe(false); // John 22 doesn't exist
            expect(isValidReference('Genesis', 50, 26, 49, 1)).toBe(false); // End chapter before start
        });

        // Unknown books
        it('should reject unknown books', () => {
            expect(isValidReference('FakeBook', 1, 1)).toBe(false);
            expect(isValidReference('Hezekiah', 1, 1)).toBe(false);
        });
    });

    describe('Parser integration', () => {
        it('should not parse invalid references', () => {
            const refs = findAllReferences('Genesis 3:34');
            expect(refs).toHaveLength(0);
        });

        it('should not parse invalid chapter', () => {
            const refs = findAllReferences('Genesis 51:1');
            expect(refs).toHaveLength(0);
        });

        it('should not parse invalid cross-chapter range', () => {
            const refs = findAllReferences('Genesis 3:34-4:1');
            expect(refs).toHaveLength(0);
        });

        it('should still parse valid references', () => {
            const refs = findAllReferences('Genesis 3:24-4:1');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('Genesis');
            expect(refs[0].chapter).toBe(3);
            expect(refs[0].verseStart).toBe(24);
            expect(refs[0].chapterEnd).toBe(4);
            expect(refs[0].verseEnd).toBe(1);
        });

        it('should handle mixed valid and invalid references', () => {
            const text = 'John 3:16 is valid, but Genesis 3:34 is not';
            const refs = findAllReferences(text);
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('John');
        });
    });
});
