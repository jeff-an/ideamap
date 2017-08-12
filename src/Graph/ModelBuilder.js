import $ from 'jquery';
import $q from '../Utils/AsyncQueue.js';
import { getSingleArticle } from '../Services/TitleSearchService.js';
import { analyzeSingleArticle } from '../Services/DocumentService.js';

/*
* Iteratively finds related concepts using BFS for a single URI
*/
function findRelatedConcepts(uri, title, maxDepth) {
    // Take the analyzed article's titles and get URIs for each
    function titleToURIs(terms) {
        return Promise.all(terms.all.map(title => getSingleArticle(title).then(function(data) {
            return [data.uri, data.title, 2];
        }, function(rejection) {
            console.error(rejection);
            return [null];
        }))).then(function(uris) {
            return uris.filter(arr => !arr.includes(null) && !arr.includes(undefined));
        });
    }
    $q.init(maxDepth);
    $q.enqueue(analyzeSingleArticle, [uri, title, 5], e => e, titleToURIs);
    return $q.begin();
}

export { findRelatedConcepts };
