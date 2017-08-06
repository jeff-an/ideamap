import $ from 'jquery';
import TitleSearchStore from './TitleSearchStore.js';

function cleanInput(str) {
    // eslint-disable-next-line
    let specialCharRegex = /[\\!@#$%^=+()&|{}\[\]<>?.\/~`*]+/g;
    return str.replace(specialCharRegex, "");
}

function openSearch(searchString, n) {
    // Do some basic input validation
    let str = cleanInput(searchString);
    let limit = n > 500 ? 500 : n;
    let request = {
        url: "https://en.wikipedia.org/w/api.php",
        dataType: "jsonp", // Required for cross domain requests
        method: 'GET',
        data: {
            action: 'opensearch',
            search: str,
            limit: limit,
            format: 'json',
            suggest: true,
            redirects: 'resolve'
        }
    };
    return $.ajax(request);
}

/*
* Stores up to 10 top matching results in the title search store
*/
function getTopMatchingArticles(searchString) {
    openSearch(searchString, 10).then(function(response) {
        if (typeof response !== 'object' || response.length < 4) {
            return null;
        }
        TitleSearchStore.dispatch({
            type: 'TITLE_SEARCH_RESULT',
            query: searchString,
            data: response
        });
    });
}

/*
* Returns promise representing title/uri of a single article
*/
function getSingleArticle(searchString) {
    return new Promise(function(resolve, reject) {
        openSearch(searchString, 1).then(function(response) {
            let regex = /\/wiki\//;
            if (typeof response !== 'object' || response.length < 4) {
                return reject(null);
            }
            return resolve({
                title: (response[1])[0],
                uri: ((response[3])[0].split(regex))[1]
            });
        });
    });
}

export { getTopMatchingArticles as default };
