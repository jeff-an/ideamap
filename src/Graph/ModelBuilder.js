import $q from '../Utils/AsyncQueue.js';
import { getSingleArticle } from '../Services/TitleSearchService.js';
import { analyzeSingleArticle } from '../Services/DocumentService.js';
import store from '../Store/CentralStore.js';

/*
* Iteratively finds related concepts using BFS for a single URI
*/
function findRelatedConcepts(articleObj, maxDepth) {
    // articleObj has title, uri, and summary as properties
    // Take the analyzed article's titles and get URIs for each
    function mapWordToMetaData(terms) {
        return new Promise(function(resolve, reject) {
            // Map of canonical names to URI/title/extract
            let metaData = {};
            Promise.all(terms.all.map(word => getSingleArticle(word).then(function(data) {
                // Data contains uri, title, summary
                if (data !== null) {
                    metaData[word] = data;
                }
            }, function(rejection) {
                // Log and continue
                console.error(rejection);
            }))).then(function() {
                if (Object.keys(metaData).length !== 0) {
                    return resolve(Object.assign(terms, {
                        metaData: metaData
                    }));
                }
                return reject(null);
            });
        });
    }

    function requeue(terms) {
        let toRequeue = [];
        terms.all.forEach(word => {
            let mappedData = terms.metaData[word];
            if (mappedData !== undefined && mappedData !== null) {
                toRequeue.push([mappedData.uri, mappedData.title, 2]);
            }
        });
        return toRequeue;
    }

    $q.init({
        maxDepth: maxDepth
    });
    $q.enqueue(analyzeSingleArticle, [articleObj.uri, articleObj.title, 5], mapWordToMetaData, requeue);
    return $q.begin();
}

/*
* Converts related concepts data into graph model
*/
function buildGraphModel(articleObj, maxDepth) {
    findRelatedConcepts(articleObj, maxDepth).then(function(rawData) {
        console.log("Raw data for graph model", rawData);
        let nodes = {
            all: [],
            byId: {}
        };
        let connections = [];
        let subnodes = {
            all: [],
            byId: {}
        };
        let meta = articleObj;

        // Add root first (it is the only node for which we have no extract info)
        let rootNode = {
            text: articleObj.title,
            url: 'http://en.wikipedia.org/wiki/' + articleObj.uri,
            note: articleObj.summary
        };
        nodes.all.push(rootNode);
        nodes.byId[articleObj.title] = rootNode;

        // Process and populate data for inner nodes first
        for (let index in rawData.all) {
            if (index === 0) {
                // Already handled the first result
                continue;
            }
            let node = rawData.all[index];
            let relatedWords = node.all;

            for (let word of relatedWords) {
                // Does the metadata exist and have we added it already?
                let mappedData = node.metaData[word];
                if (mappedData === undefined) {
                    continue;
                } else if (nodes.byId[mappedData.title] !== undefined) {
                    continue;
                }

                // Add node
                let newNode = {
                    text: mappedData.title,
                    url: 'http://en.wikipedia.org/wiki/' + mappedData.uri,
                    note: mappedData.summary
                };
                nodes.all.push(newNode);
                nodes.byId[mappedData.title] = newNode;

                // Add connection
                connections.push({
                    source: node.__previous[1],
                    target: mappedData.title
                });
            }
        }

        store.dispatch({
            type: 'GRAPH_MODEL_GEN_SUCCESS',
            nodes: nodes,
            connections: connections,
            subnodes: subnodes,
            meta: meta
        });

    }, function(error) {
        console.error(error);
        store.dispatch({
            type: 'GRAPH_MODEL_GEN_FAILURE',
            meta: articleObj,
            query: {
                uri: articleObj.uri,
                title: articleObj.title,
                maxDepth: maxDepth
            },
            error: error
        });
    });
}

function getRandomColorAsString() {
    function rand() {
        return Math.floor(Math.random() * 256);
    }
    return `rgb(${rand()}, ${rand()}, ${rand()})`;
}

export { buildGraphModel };
