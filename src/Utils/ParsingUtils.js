var noMatches = ['that', 'have', 'with', 'this', 'from', 'about', 'they', 'will', 'what', 'their', 'there', 'which'];

/*
* Returns an object summarizing the raw frequencies of tokens
*/
function getTokenFrequency(doc, title) {
    let words = tokenize(doc);
    let hm = {};
    let max = 0;

    for (let word of words) {
        if (exclude(word, title)) {
            continue;
        } else if (hm[word] === undefined) {
            hm[word] = 1;
        } else {
            hm[word] = hm[word] + 1;
        }
        max = Math.max(max, hm[word]);
    }
    // Normalize with respect to the maximum
    Object.keys(hm).forEach(key => hm[key] /= max);

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
    let regex = /({.*}|\\n|[\W])+/; // match any non-word character greedily
    let words = doc.split(regex);
    let result = [];
    // Discard any single-letter words and common words
    for (let index in words) {
        let word = words[index];
        if (word === "Further" && words[index + 1] === "reading") {
            break;
        } else if (word === "References" || word === "ISBN") {
            break;
        } else if (word.length < 4 || noMatches.includes(word)) {
            continue;
        } else {
            result.push(word.toLowerCase());
        }
    }
    return result;
}

// Only get frequencies for terms that include returns true for
function excludeImpl(str, title) {
    let titleTerms = title.split(/\s+/);
    return titleTerms.map(e => str.includes(e)).reduce((a, b) => a && b);
}

function exclude(str, title) {
    let lstr = str.toLowerCase();
    let ltitle = title.toLowerCase();
    return excludeImpl(lstr, ltitle) && excludeImpl(ltitle, lstr);
}

export { getTokenFrequency, exclude};
