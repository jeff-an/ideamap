import { getAllWordFrequencies } from '../Services/WordSearchService.js';

/*
* Computes standard deviation of an array of data assuming weight of 1 per element
*/
function stdev(arr) {
    if (arr == null || arr.length < 1) {
        return 0;
    }
    let avg = arr.reduce((a, b) => a + b) / arr.length;
    return {
        avg: avg,
        stdev: Math.sqrt(arr.reduce((a, b) => a + (b - avg) * (b - avg)) / arr.length)
    };
}

/*
* Computes term frequency-inverse document frequency for a list of words, returning promise
*/
function tf_idf(words) {
    // Words is an object contaning all (array of words) and byWord (map of word to frequency)
    return new Promise(function(resolve, reject) {
        getAllWordFrequencies(words.all).then(function(frequencies) {
            if (frequencies == null || frequencies.length < 1) {
                Error("Getting word frequencies failed");
                return reject(null);
            }
            let all = [];
            let byWord = {};
            Object.keys(frequencies).forEach(function(word) {
                if (frequencies[word] <= 798) {
                    let idfFreq = frequencies[word] < 1 ? 1 : frequencies[word]; // Prevent division by 0
                    let rawFreq = (words.byWord)[word] == null ? 0.01 : (words.byWord)[word];
                    let tfidf = rawFreq * Math.pow(Math.log(798.15 / idfFreq), 2);
                    byWord[word] = tfidf;
                    all.push(word);
                }
            });
            return resolve({
                all: all,
                byWord: byWord,
            });
        }, function(error) {
            console.log(error);
        });
    });
}

export { tf_idf, stdev };
