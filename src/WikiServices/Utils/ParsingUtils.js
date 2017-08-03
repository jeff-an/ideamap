/*
* Returns an object summarizing the raw frequencies of tokens
*/
function getTokenFrequency(doc) {
    let words = tokenize(doc);
    let hm = {};
    for (let word of words) {
        if (hm[word] === undefined) {
            hm[word] = 1;
        } else {
            hm[word] = hm[word] + 1;
        }
    }
    // Descending order
    let tokens = Object.keys(hm).sort((a, b) => hm[b] - hm[a]);
    return {
        all: tokens,
        byWord: hm
    };
}

/*
* Returns an array of string tokens not including punctuation or whitespace
*/
function tokenize(doc) {
    let regex = /[\W]+/; // match any non-word character greedily
    let words = doc.split(regex);
    let result = [];
    // Discard any single-letter words and
    for (let word of words) {
        if (word.length < 3) {
            continue;
        } else {
            result.push(word.toLowerCase());
        }
    }
    return result;
}

export { getTokenFrequency };
