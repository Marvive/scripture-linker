import { findAllReferences } from '../src/referenceParser';

describe('Reference Parsing Refinements', () => {
    describe('Cross-Chapter Ranges', () => {
        it('should parse simple cross-chapter range like John 3:36-4:1', () => {
            const refs = findAllReferences('Read John 3:36-4:1');
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('John');
            expect(refs[0].chapter).toBe(3);
            expect(refs[0].verseStart).toBe(36);
            expect(refs[0].chapterEnd).toBe(4);
            expect(refs[0].verseEnd).toBe(1);
            expect(refs[0].rawText).toBe('John 3:36-4:1');
        });

        it('should parse shorthand cross-chapter range', () => {
            const refs = findAllReferences('John 3:36 and 3:37-4:1');
            // Note: 3:37-4:1 is invalid because John 3:37 doesn't exist (John 3 has 36 verses).
            // Only the first valid reference should be parsed.
            expect(refs).toHaveLength(1);
            expect(refs[0].book).toBe('John');
            expect(refs[0].chapter).toBe(3);
            expect(refs[0].verseStart).toBe(36);
        });
    });

    describe('Line-Bounded Context', () => {
        it('should NOT use context from previous line', () => {
            const text = `- John 3:17\n- 4:1`;
            const refs = findAllReferences(text);
            expect(refs).toHaveLength(1); // Only John 3:17 should match
            expect(refs[0].rawText).toBe('John 3:17');
        });

        it('should use context if on same line', () => {
            const text = `John 3:16, 17, 18`; // This is handled by a different logic usually? 
            // Actually our current regex doesn't handle comma separated verses in one match.
            // But shorthand 17:1 should work if on same line.
            const refs = findAllReferences('John 3:16 and 4:1');
            expect(refs).toHaveLength(2);
            expect(refs[1].book).toBe('John');
        });

        it('should handle the large example provided by user', () => {
            const text = `
- John 3:17
- Genesis 3:24-4:1

- Eli was a High Priest and Judge of Israel at Shiloh...
- The Inauguration of Monarchy at Gilgal (11:14–12:25)
            `;
            const refs = findAllReferences(text);

            // Expected matches:
            // 1. John 3:17
            // 2. Genesis 3:24-4:1 (valid cross-chapter range, Gen 3 has 24 verses)
            // 3. (11:14–12:25) should NOT be matched because there's no book on its line

            const matches = refs.map(r => r.rawText);
            expect(matches).toContain('John 3:17');
            expect(matches).toContain('Genesis 3:24-4:1');
            expect(matches).not.toContain('11:14–12:25');
            expect(matches).not.toContain('(11:14–12:25)');
        });
    });
});
