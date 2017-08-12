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
function tf_idf(words, uri) {
    // Words is an object contaning all (array of words) and byWord (map of word to frequency)
    return new Promise(function(resolve, reject) {
        getAllWordFrequencies(words.all).then(function(response) {
            let frequencies = {};
            response.forEach(data => {
                if (data == null || data[0] == null || data[0].tags == null) {
                    return;
                }
                let frequencyString = (data[0].tags)[0];
                let word = data[0].word;
                frequencies[word] = parseFloat(frequencyString.match('[0-9.]+')[0]);
            });

            if (frequencies == null || frequencies.length < 1) {
                Error("Getting word frequencies failed");
                return reject(null);
            }
            let all = [];
            let byWord = {};
            Object.keys(frequencies).forEach(function(word) {
                if (frequencies[word] <= 798) { // Prevent taking log of something less than 1
                    let idfFreq = frequencies[word] < 1 ? 1 : frequencies[word]; // Prevent division by 0
                    let rawFreq = (words.byWord)[word] == null || isNaN(words.byWord[word]) ? 0.01 : (words.byWord)[word];
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
            console.error(error);
            return reject(null);
        });
    });
}

export { tf_idf, stdev };
