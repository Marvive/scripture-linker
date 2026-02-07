import { findAllReferences } from '../src/referenceParser';

describe('Link Update Detection', () => {
    it('should expand range to include existing Logos link', () => {
        const text = 'Read [John 3:16](https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16) today';
        const refs = findAllReferences(text);

        expect(refs).toHaveLength(1);
        expect(refs[0].book).toBe('John');
        expect(refs[0].rawText).toBe('John 3:16');

        // Range should cover [John 3:16](https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16)
        const matchedText = text.substring(refs[0].startIndex, refs[0].endIndex);
        expect(matchedText).toBe('[John 3:16](https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16)');
    });

    it('should expand range to include existing Bolls link', () => {
        const text = 'Read [John 3:16](https://bolls.life/ESV/43/3/#16) today';
        const refs = findAllReferences(text);

        expect(refs).toHaveLength(1);
        expect(refs[0].book).toBe('John');
        expect(refs[0].rawText).toBe('John 3:16');

        const matchedText = text.substring(refs[0].startIndex, refs[0].endIndex);
        expect(matchedText).toBe('[John 3:16](https://bolls.life/ESV/43/3/#16)');
    });

    it('should expand range to include "Both" links structure', () => {
        const text = 'John 3:16 ([Logos](https://ref.ly/...) | [Bolls](https://bolls.life/...)) is great';
        const refs = findAllReferences(text);

        expect(refs).toHaveLength(1);
        expect(refs[0].book).toBe('John');
        expect(refs[0].rawText).toBe('John 3:16');

        const matchedText = text.substring(refs[0].startIndex, refs[0].endIndex);
        expect(matchedText).toBe('John 3:16 ([Logos](https://ref.ly/...) | [Bolls](https://bolls.life/...))');
    });

    it('should NOT expand range for non-plugin links in text part', () => {
        // This should be skipped as per isInsideMarkdownLink if it doesn't match isPluginManagedUrl
        const text = '[John 3:16](https://example.com)';
        const refs = findAllReferences(text);
        expect(refs).toHaveLength(0);
    });

    it('should NOT expand range for non-plugin links in URL part', () => {
        const text = 'Read this [link](https://ref.ly/John3:16)';
        const refs = findAllReferences(text);
        expect(refs).toHaveLength(0);
    });
});
