import $ from 'jquery';

/*
* Immediately executed function to serve as the container for multiple AJAX results
*/
let collection = (function() {
    var limit = 0;
    var length = 0;
    var set = false;
    var data = {};
    return {
        addElement: function(elm) {
            data[elm.word] = elm.frequency;
            ++length;
        },
        getLength: function() {
            return length;
        },
        getData: function() {
            return data;
        },
        setLimit: function(i) {
            if (set === false) {
                limit = i;
                set = true;
            } else {
                console.error("Attempted to set the AJAX limit multiple times per run.");
                return;
            }
        },
        getLimit: function() {
            return limit;
        },
        clearData: function() {
            data = {};
            limit = 0;
            length = 0;
            set = false;
        }
    };
})();

/*
* Callback function to be called on success for all AJAX requests
*/
function success(data) {
    if (data != null && data.length > 0) {
        let obj = data[0];
        let frequencyString = (obj.tags)[0];
        let word = obj.word;
        let frequency = parseFloat(frequencyString.match('[0-9.]+')[0]);

        collection.addElement({
            word: word,
            frequency: frequency
        });

        // Resolve the entire chain of AJAX requests if all requests are finished
        if (collection.getLength() >= collection.getLimit()) {
            this.resolve(collection.getData());
        }
    }
}

/*
* Returns a promise that is resolved with the freqency values of all words in the array
*/
function getAllWordFrequencies(list) {
    collection.clearData();
    collection.setLimit(list.length);
    return new Promise(function(resolve, reject) {
        list.forEach(e => getWordFrequency(e, resolve));
    });
}

/*
* Returns the frequency of a single word in occurrences per million words and calls success callback
*/
function getWordFrequency(word, resolve) {
    let request = {
        method: 'GET',
        dataType: 'json',
        url: 'http://api.datamuse.com/words',
        success: success,
        context: {
            resolve: resolve
        },
        data: {
            sp: word, // Spelled like word
            md: "f", // Get frequency metadata
            max: 1 // Return max 1 result
        }
    };
    $.ajax(request);
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
