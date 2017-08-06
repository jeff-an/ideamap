/*
* Returns an object summarizing the raw frequencies of tokens
*/
function getTokenFrequency(doc) {
    let words = tokenize(doc);
    let hm = {};
    let max = 0;
    for (let word of words) {
        if (hm[word] === undefined) {
            hm[word] = 1;
        } else {
            hm[word] = hm[word] + 1;
        }
        max = Math.max(max, hm[word]);
    }
    // Normalize with respect to the maximum
    Object.keys(hm).forEach(key => hm.key /= max);
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
    let regex = /(\\n|[\W])+/; // match any non-word character greedily
    let words = doc.split(regex);
    let result = [];
    // Discard any single-letter words and common words
    for (let index in words) {
        let word = words[index];
        if (word === "Further" && words[index + 1] === "reading") {
            break;
        } else if (word === "References" || word === "ISBN") {
            break;
        } else if (word.length < 4 || checkCommonWord(word)) {
            continue;
        } else {
            result.push(word.toLowerCase());
        }
    }
    return result;
}

function checkCommonWord(word) {
    let noMatches = ['that', 'have', 'with', 'this', 'from', 'about', 'they', 'will', 'what', 'their', 'there', 'which'];
    return noMatches.includes(word);
}

export { getTokenFrequency };
