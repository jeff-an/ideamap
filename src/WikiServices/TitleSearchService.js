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
    $.ajax(request).then(function(response) {
        if (typeof response !== 'object' || response.length < 4) {
            return null;
        }
        TitleSearchStore.dispatch({
            type: 'TITLE_SEARCH_RESULT',
            query: str,
            data: response
        });
    });
    return;
}

function getTopMatchingArticles(searchString) {
    openSearch(searchString, 10);
    return;
}

export { getTopMatchingArticles as default };
