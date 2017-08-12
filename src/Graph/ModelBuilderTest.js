import { findRelatedConcepts } from './ModelBuilder.js';

describe('test sanity', () => {
    test.only('check model non-emptiness', () => {
        findRelatedConcepts('apple', 2).then(data => {
            expect(data).not.toEqual(null);
            expect(data.length).not.toBe(0);
        });
    });
});
