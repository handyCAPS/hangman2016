/* global describe, it, expect  */
/* jshint undef: false */

describe("Testing word functions", function() {
    var word = 'testing';
    var wordArray = ['t','e','s','t','i','n','g'];

    it("should split a word into an array of letters", function() {
        expect(splitWord(word)).toEqual(wordArray);
    });

    it('should find all indexes in an array', function() {
        expect(findIndexes('t', word)).toEqual([0,3]);
        expect(findIndexes('e', word)).toEqual([1]);
        expect(findIndexes('q', word)).toEqual([]);
    });
});