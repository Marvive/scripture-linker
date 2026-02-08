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

    it('should match references enclosed in parentheses', () => {
        const refs = findAllReferences('Read (Ge 1:1)');
        expect(refs).toHaveLength(1);
        expect(refs[0].book).toBe('Genesis');
        // Parentheses are NOT part of the match for full references
        expect(refs[0].rawText).toBe('Ge 1:1');
    });

    it('should match (est 3:1-8) without including leading parenthesis', () => {
        const refs = findAllReferences('This is (est 3:1-8)');
        expect(refs).toHaveLength(1);
        expect(refs[0].book).toBe('Esther');
        expect(refs[0].rawText).toBe('est 3:1-8');
    });

    it('should match shorthand WITH parentheses included', () => {
        const refs = findAllReferences('Gen 1:1 and (1:2)');
        expect(refs).toHaveLength(2);
        expect(refs[1].rawText).toBe('(1:2)');
    });
});
