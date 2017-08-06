import $ from 'jquery';
import { getTokenFrequency } from '../Utils/ParsingUtils.js';
import { tf_idf, stdev } from '../Utils/StatUtils.js';

function getBodyAndLinks(uri) {
    return new Promise(function(resolve, reject) {
        let request = {
            method: 'GET',
            url: 'https://en.wikipedia.org/w/api.php',
            dataType: 'jsonp',
            data: {
                action: 'query',
                format: 'json',
                prop: 'extracts|links',
                explaintext: '',
                exlimit: 1,
                titles: uri,
                redirects: 0
            }
        };
        $.ajax(request).then(function(data) {
            if (data == null || data.query == null || data.query.pages == null) {
                reject(0);
            }
            let articleNum = Object.keys(data.query.pages)[0];
            return resolve((data.query.pages)[articleNum]);
        });
    });
}

/*
* Returns promise representing ranks of top terms in an article
*/
function analyzeSingleArticle(uri) {
    return new Promise(function(resolve, reject) {
        // Get body and links
        getBodyAndLinks(uri).then(function(obj) {
            // Tokenize and get raw frequencies
            let extract = obj.extract;
            let links = obj.links;
            let rawFrequencies = getTokenFrequency(extract);
            let totalTerms = rawFrequencies.all.length;
            let linkTerms = [];

            // Process links
            rawFrequencies.all = (rawFrequencies.all).slice(0, totalTerms < 30 ? totalTerms : 30);
            let regex = /[^a-zA-Z]+/;
            for (let element of links) {
                for (let term of element.title.split(regex)) {
                    if (term.length > 3 && !rawFrequencies.all.includes(term.toLowerCase())) {
                        linkTerms.push(term.toLowerCase());
                    }
                }
            }
            rawFrequencies.all = rawFrequencies.all.concat(linkTerms);

            // Get tf-idf
            let allTerms = [];
            let byWord = {};
            tf_idf(rawFrequencies).then(function(result) {
                // Add links over 1 standard deviation away from the mean to results
                for (let element of links) {
                    let tfidfAvg = 0;
                    let terms = element.title.split(regex);
                    for (let term of terms) {
                        if (term.length > 3 && (result.byWord)[term.toLowerCase()] != null) {
                            tfidfAvg += (result.byWord)[term.toLowerCase()];
                        }
                    }
                    tfidfAvg /= terms.length;
                    (result.all).push(element.title);
                    (result.byWord)[element.title] = tfidfAvg;
                }
                allTerms = (result.all).sort((a, b) => (result.byWord)[b] - (result.byWord)[a]).slice(0, 8);
                allTerms.forEach(e => byWord[e] = (result.byWord)[e]);
                return resolve({
                    all: allTerms,
                    byWord: byWord
                });
            }, function(error) {
                console.log(error);
            });
        });
    });
}

export { analyzeSingleArticle };