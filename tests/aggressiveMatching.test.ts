import { findAllReferences } from '../src/referenceParser';

describe('Aggressive Matching Preventions', () => {
    it('should NOT match "est" inside "test"', () => {
        const text = 'This is a test 3:1-8';
        const refs = findAllReferences(text);

        // Should not match "est" inside "test"
        expect(refs).toHaveLength(0);
    });

    it('should NOT match book names embedded in other words', () => {
        const refs1 = findAllReferences('My agent 3:16 is busy'); // 'gen' in 'agent'
        expect(refs1).toHaveLength(0);

        const refs2 = findAllReferences('The manifest 1:1 was signed'); // 'est' in 'manifest'
        expect(refs2).toHaveLength(0);
    });

    it('should still match valid references with word boundaries', () => {
        const refs = findAllReferences('Read Gen 1:1');
        expect(refs).toHaveLength(1);
        expect(refs[0].book).toBe('Genesis');
    });

    it('should match references at the beginning of a line', () => {
        const refs = findAllReferences('John 3:16');
        expect(refs).toHaveLength(1);
    });

    it('should match references with periods after abbreviations', () => {
        const refs = findAllReferences('Gen. 1:1');
        expect(refs).toHaveLength(1);
    });
});
