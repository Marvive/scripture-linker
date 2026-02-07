import { findBook, BIBLE_BOOKS, buildBookPattern } from '../src/bibleBooks';

describe('findBook', () => {
    describe('Full Names', () => {
        it('should find Genesis by full name', () => {
            const book = findBook('Genesis');
            expect(book).toBeDefined();
            expect(book?.name).toBe('Genesis');
            expect(book?.osis).toBe('Ge');
            expect(book?.bollsId).toBe(1);
        });

        it('should find Revelation by full name', () => {
            const book = findBook('Revelation');
            expect(book).toBeDefined();
            expect(book?.name).toBe('Revelation');
            expect(book?.bollsId).toBe(66);
        });

        it('should be case insensitive', () => {
            expect(findBook('GENESIS')).toBeDefined();
            expect(findBook('genesis')).toBeDefined();
            expect(findBook('GeNeSiS')).toBeDefined();
        });
    });

    describe('Common Abbreviations', () => {
        const abbreviationTests = [
            { input: 'Gen', expected: 'Genesis' },
            { input: 'Ex', expected: 'Exodus' },
            { input: 'Lev', expected: 'Leviticus' },
            { input: 'Num', expected: 'Numbers' },
            { input: 'Deut', expected: 'Deuteronomy' },
            { input: 'Josh', expected: 'Joshua' },
            { input: 'Judg', expected: 'Judges' },
            { input: 'Ps', expected: 'Psalm' },
            { input: 'Prov', expected: 'Proverbs' },
            { input: 'Isa', expected: 'Isaiah' },
            { input: 'Jer', expected: 'Jeremiah' },
            { input: 'Matt', expected: 'Matthew' },
            { input: 'Mk', expected: 'Mark' },
            { input: 'Lk', expected: 'Luke' },
            { input: 'Jn', expected: 'John' },
            { input: 'Rom', expected: 'Romans' },
            { input: 'Gal', expected: 'Galatians' },
            { input: 'Eph', expected: 'Ephesians' },
            { input: 'Phil', expected: 'Philippians' },
            { input: 'Heb', expected: 'Hebrews' },
            { input: 'Rev', expected: 'Revelation' },
        ];

        test.each(abbreviationTests)('should find $expected from $input', ({ input, expected }) => {
            const book = findBook(input);
            expect(book?.name).toBe(expected);
        });
    });

    describe('Numbered Books', () => {
        it('should find 1 Samuel', () => {
            expect(findBook('1 Samuel')?.name).toBe('1 Samuel');
            expect(findBook('1 Sam')?.name).toBe('1 Samuel');
            expect(findBook('1Sam')?.name).toBe('1 Samuel');
            expect(findBook('1sa')?.name).toBe('1 Samuel');
        });

        it('should find 2 Kings', () => {
            expect(findBook('2 Kings')?.name).toBe('2 Kings');
            expect(findBook('2 Kgs')?.name).toBe('2 Kings');
            expect(findBook('2kgs')?.name).toBe('2 Kings');
        });

        it('should find 1 Corinthians', () => {
            expect(findBook('1 Corinthians')?.name).toBe('1 Corinthians');
            expect(findBook('1 Cor')?.name).toBe('1 Corinthians');
            expect(findBook('1cor')?.name).toBe('1 Corinthians');
        });

        it('should find 1 John', () => {
            expect(findBook('1 John')?.name).toBe('1 John');
            expect(findBook('1 Jn')?.name).toBe('1 John');
            expect(findBook('1jn')?.name).toBe('1 John');
        });
    });

    describe('Period Handling', () => {
        it('should handle periods after abbreviations', () => {
            expect(findBook('Gen.')?.name).toBe('Genesis');
            expect(findBook('Matt.')?.name).toBe('Matthew');
            expect(findBook('1 Sam.')?.name).toBe('1 Samuel');
        });
    });

    describe('Edge Cases', () => {
        it('should return undefined for unknown book', () => {
            expect(findBook('FakeBook')).toBeUndefined();
        });

        it('should handle empty string', () => {
            expect(findBook('')).toBeUndefined();
        });

        it('should handle whitespace', () => {
            expect(findBook('  Genesis  ')?.name).toBe('Genesis');
        });
    });
});

describe('BIBLE_BOOKS', () => {
    it('should contain exactly 66 books', () => {
        expect(BIBLE_BOOKS).toHaveLength(66);
    });

    it('should have unique bollsId for each book', () => {
        const ids = BIBLE_BOOKS.map(b => b.bollsId);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(66);
    });

    it('should have bollsId from 1 to 66', () => {
        const ids = BIBLE_BOOKS.map(b => b.bollsId).sort((a, b) => a - b);
        expect(ids[0]).toBe(1);
        expect(ids[65]).toBe(66);
    });

    it('should have proper OSIS codes', () => {
        const genesis = BIBLE_BOOKS.find(b => b.name === 'Genesis');
        const john = BIBLE_BOOKS.find(b => b.name === 'John');
        const revelation = BIBLE_BOOKS.find(b => b.name === 'Revelation');

        expect(genesis?.osis).toBe('Ge');
        expect(john?.osis).toBe('Jn');
        expect(revelation?.osis).toBe('Re');
    });
});

describe('buildBookPattern', () => {
    it('should return a non-empty pattern', () => {
        const pattern = buildBookPattern();
        expect(pattern.length).toBeGreaterThan(0);
    });

    it('should contain book names and abbreviations', () => {
        const pattern = buildBookPattern();
        expect(pattern).toContain('Genesis');
        expect(pattern).toContain('Gen');
        expect(pattern).toContain('John');
        expect(pattern).toContain('jn');
    });

    it('should create a valid regex pattern', () => {
        const pattern = buildBookPattern();
        expect(() => new RegExp(pattern, 'gi')).not.toThrow();
    });
});
