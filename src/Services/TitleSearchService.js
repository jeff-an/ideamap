import $ from 'jquery';
import store from '../Store/CentralStore.js';

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
    openSearch(searchString, 8).then(function(response) {
        if (response == null || response.length < 4) {
            console.error("Received malformed response: " + JSON.stringify(response));
            throw new Error("Error occurred when searching for top wikipedia articles");
        }
        store.dispatch({
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
            if (response == null || response.length < 4 || (response[3])[0] == undefined) {
                console.error("Received malformed response: " + JSON.stringify(response));
                return reject(null);
            }
            return resolve({
                title: (response[1])[0],
                uri: (decodeURIComponent(response[3][0]).split(regex))[1],
                summary: response[2][0]
            });
        }, function(error) {
            console.log(error.message);
            throw new Error("Error occurred when searching for Wikipedia article.");
        });
    });
}

export { getTopMatchingArticles as default, getSingleArticle };
