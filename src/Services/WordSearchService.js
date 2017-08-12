import $ from 'jquery';

/*
* Returns a promise that is resolved with the raw freqency values of all words in the array
*/
function getAllWordFrequencies(list) {
    return Promise.all(list.map(e => getWordFrequency(e)));
}

/*
* Returns the frequency of a single word in occurrences per million words and calls success callback
*/
function getWordFrequency(word) {
    let request = {
        method: 'GET',
        dataType: 'json',
        url: 'http://api.datamuse.com/words',
        data: {
            sp: word, // Spelled like word
            md: "f", // Get frequency metadata
            max: 1 // Return max 1 result
        }
    };
    return Promise.resolve($.ajax(request));
}

/*
* Returns a promise representing the frequency of a single word in occurrences per million words
*/
function getSingleWordFrequency(word) {
    let request = {
        method: 'GET',
        dataType: 'json',
        url: 'http://api.datamuse.com/words',
        data: {
            sp: word, // Spelled like word
            md: "f", // Get frequency metadata
            max: 1 // Return max 1 result
        }
    };
    return $.ajax(request);
}

export { getAllWordFrequencies, getSingleWordFrequency };
