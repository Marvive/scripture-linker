import { findAllReferences, parseReference, formatReference } from '../src/referenceParser';

describe('findAllReferences', () => {
    describe('Standard References', () => {
        it('should find a simple reference like John 3:16', () => {
            const refs = findAllReferences('Read John 3:16 today');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('John');
            expect(refs[0].chapter).toBe(3);
            expect(refs[0].verseStart).toBe(16);
        });

        it('should find a reference with verse range', () => {
            const refs = findAllReferences('See Genesis 1:1-3');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('Genesis');
            expect(refs[0].chapter).toBe(1);
            expect(refs[0].verseStart).toBe(1);
            expect(refs[0].verseEnd).toBe(3);
        });

        it('should find chapter-only references', () => {
            const refs = findAllReferences('Psalm 23 is comforting');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('Psalm');
            expect(refs[0].chapter).toBe(23);
            expect(refs[0].verseStart).toBeUndefined();
        });
    });

    describe('Abbreviated Book Names', () => {
        it('should recognize Jn for John', () => {
            const refs = findAllReferences('Jn 3:16');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('John');
        });

        it('should recognize Gen for Genesis', () => {
            const refs = findAllReferences('Gen. 1:1');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('Genesis');
        });

        it('should recognize 1 Cor for 1 Corinthians', () => {
            const refs = findAllReferences('1 Cor 13:4-8');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('1 Corinthians');
            expect(refs[0].chapter).toBe(13);
            expect(refs[0].verseStart).toBe(4);
            expect(refs[0].verseEnd).toBe(8);
        });

        it('should recognize Ps for Psalm', () => {
            const refs = findAllReferences('Ps 23:1');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('Psalm');
        });
    });

    describe('Numbered Books', () => {
        it('should handle 1 Samuel', () => {
            const refs = findAllReferences('1 Sam. 13:2');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('1 Samuel');
        });

        it('should handle 2 Kings', () => {
            const refs = findAllReferences('2 Kgs 5:10');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('2 Kings');
        });

        it('should handle 1 John', () => {
            const refs = findAllReferences('1 Jn 4:8');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('1 John');
        });
    });

    describe('Contextual References', () => {
        it('should use last book context for shorthand references', () => {
            const refs = findAllReferences('1 Sam. 13:2 and 10:7');
            expect(refs).toHaveLength(2);
            expect(refs[0].book).toBe('1 Samuel');
            expect(refs[1].book).toBe('1 Samuel');
            expect(refs[1].chapter).toBe(10);
            expect(refs[1].verseStart).toBe(7);
        });

        it('should handle parenthetical shorthand references', () => {
            const refs = findAllReferences('1 Sam. 13:2 (14:52)');
            expect(refs).toHaveLength(2);
            expect(refs[1].book).toBe('1 Samuel');
            expect(refs[1].chapter).toBe(14);
            expect(refs[1].verseStart).toBe(52);
        });

        it('should not match shorthand without prior context', () => {
            const refs = findAllReferences('See 10:7 for details');
            expect(refs).toHaveLength(0);
        });
    });

    describe('Multiple References', () => {
        it('should find multiple references in text', () => {
            const text = 'John 3:16 is famous. See also Gen. 1:1-3 and 1 Cor 13.';
            const refs = findAllReferences(text);
            expect(refs).toHaveLength(3);
            expect(refs[0].book).toBe('John');
            expect(refs[1].book).toBe('Genesis');
            expect(refs[2].book).toBe('1 Corinthians');
        });
    });

    describe('Markdown Link Detection', () => {
        it('should not match references inside markdown links', () => {
            const refs = findAllReferences('[John 3:16](https://example.com)');
            expect(refs).toHaveLength(0);
        });

        it('should not match references in URL part of markdown links', () => {
            const refs = findAllReferences('[link](https://example.com/John3:16)');
            expect(refs).toHaveLength(0);
        });

        it('should match references outside markdown links', () => {
            const refs = findAllReferences('[link](url) John 3:16');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('John');
        });
    });

    describe('Edge Cases', () => {
        it('should handle periods after abbreviations', () => {
            const refs = findAllReferences('Gen. 1:1');
            expect(refs).toHaveLength(1);
            expect(refs[0].rawText).toBe('Gen. 1:1');
        });

        it('should handle en-dash in verse ranges', () => {
            const refs = findAllReferences('John 3:16–18');
            expect(refs).toHaveLength(1);
            expect(refs[0].verseEnd).toBe(18);
        });

        it('should handle em-dash in verse ranges', () => {
            const refs = findAllReferences('John 3:16—18');
            expect(refs).toHaveLength(1);
            expect(refs[0].verseEnd).toBe(18);
        });
    });
});

describe('parseReference', () => {
    it('should return the first reference from text', () => {
        const ref = parseReference('John 3:16');
        expect(ref).not.toBeNull();
        expect(ref?.book).toBe('John');
    });

    it('should return null for text without references', () => {
        const ref = parseReference('No references here');
        expect(ref).toBeNull();
    });
});

describe('formatReference', () => {
    it('should format a simple reference', () => {
        const result = formatReference({
            book: 'John',
            chapter: 3,
            verseStart: 16,
            rawText: 'John 3:16',
            startIndex: 0,
            endIndex: 9
        });
        expect(result).toBe('John 3:16');
    });

    it('should format a reference with verse range', () => {
        const result = formatReference({
            book: 'Genesis',
            chapter: 1,
            verseStart: 1,
            verseEnd: 3,
            rawText: 'Gen 1:1-3',
            startIndex: 0,
            endIndex: 9
        });
        expect(result).toBe('Genesis 1:1-3');
    });

    it('should format a chapter-only reference', () => {
        const result = formatReference({
            book: 'Psalm',
            chapter: 23,
            rawText: 'Psalm 23',
            startIndex: 0,
            endIndex: 8
        });
        expect(result).toBe('Psalm 23');
    });
});
