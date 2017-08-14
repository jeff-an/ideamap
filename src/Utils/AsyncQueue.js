import HashMap from 'hashmap';
/*
* Asynchronous queue implementation where elements are only removed after their callbacks return,
* allowing for an ordering roughly resembling BFS
*/
var $q = (function() {
    var promise = null;
    var initialized = false;
    var queue = []; // Elements are objects { layer: 0, promise: ... callback: fn requeue: fn} that represent unresolved promises
    var maxDepth = Infinity;
    var limit = Infinity;
    var processed = 0;
    var all = [];
    var byLayer = {};
    var links = null;

    function destroy() {
        let clear = () => {
            initialized = false;
            queue = [];
            maxDepth = Infinity;
            limit = Infinity;
            all = [];
            byLayer = {};
            processed = 0;
            promise = null;
            links = null;
        };
        promise.then(clear, clear);
    }

    function addInitial(depth, promise, callback, requeue, func, args) {
        if (!initialized) {
            throw (new Error("Attempted to add to queue without initialization."));
        }
        queue.push({
            layer: depth,
            promise: promise,
            callback: callback,
            requeue: requeue,
            func: func,
            previous: args,
        });
        ++processed;
    }

    function bfs(list, resolve) {
        if (typeof list !== 'object') {
            throw new Error("List of terms to be queued is not an array.");
        } else if (list == null || list.length == 0) {
            return;
        }
        // Add promises to queue and send all
        list.forEach(element => {
            let layer = element.layer;
            let previous = element.previous;
            let toRequeue = [];
            queue.push(element);
            element.promise().then((data) => {
                // Use Promise.resolve in case callback returns a promise
                Promise.resolve(element.callback(data)).then(function(transformedData) {
                    // Attempt to define a __previous property on the object
                    if (typeof transformedData === 'object' && typeof transformedData._previous === 'undefined') {
                        try {
                            Object.defineProperty(transformedData, '__previous', {
                                enumerable: false,
                                configurable: true,
                                writable: true,
                                value: previous
                            });
                        } catch (err) {
                            // Ignore - object may not be writeable
                        }
                    }

                    // Update "all" array
                    all.push(transformedData);

                    // Update layer object
                    if (byLayer[layer] == null) {
                        byLayer[layer] = [transformedData];
                    } else {
                        byLayer[layer].push(transformedData);
                    }

                    // Update links HashMap
                    links.set(transformedData, previous);

                    // Iteratively enqueue more items according to callbacks
                    if (layer < maxDepth) {
                        // Use Promise.resolve in case requeue returns a promise
                        Promise.resolve(element.requeue(transformedData)).then(function(requeueTerms) {
                            if (requeueTerms == null || typeof requeueTerms === 'object' && requeueTerms.length === 0) {
                                requeueTerms = [];
                            }
                            if (typeof requeueTerms !== 'object') {
                                requeueTerms = [requeueTerms];
                            }
                            for (let term of requeueTerms) {
                                if (processed >= limit) {
                                    break;
                                } else if (typeof term !== 'object') {
                                    term = [term];
                                }
                                let promise = function() { // jshint ignore:line
                                    return element.func(...term);
                                };
                                toRequeue.push({
                                    layer: layer + 1,
                                    promise: promise,
                                    callback: element.callback,
                                    requeue: element.requeue,
                                    func: element.func,
                                    previous: term,
                                });
                                ++processed;
                            }
                            // Remove the element we started with since its work is finished
                            let index = queue.indexOf(element);
                            queue = queue.slice(0, index).concat(queue.slice(index + 1));

                            // Return if empty or recurse
                            if (queue.length === 0 && toRequeue.length === 0) {
                                return resolve({
                                    all: all,
                                    byLayer: byLayer
                                });
                            }
                            // Recurse with the new argument list
                            bfs(toRequeue, resolve);

                        }, function(rejection) {
                            console.error("Async Queue Error: Requeue promise was rejeted with reason " + rejection);
                        });
                    } else {
                        let index = queue.indexOf(element);
                        queue = queue.slice(0, index).concat(queue.slice(index + 1));

                        // Return if empty or recurse
                        if (queue.length === 0 && toRequeue.length === 0) {
                            resolve({
                                all: all,
                                byLayer: byLayer,
                                links: links
                            });
                        }
                    }
                }, function(rejection) {
                    console.error("Async Queue Error: Callback promise was rejected with reason " + rejection);
                });
            });
        });
    }

    return {
        init: function(max = Infinity, lim = Infinity) {
            if (!initialized) {
                promise = null;
                queue = [];
                all = [];
                byLayer = {};
                links = new HashMap();
                maxDepth = max;
                limit = lim;
                processed = 0;
                initialized = true;
            } else {
                throw (new Error("Attempted to initialize queue more than once. Did you forget to call destroy()?"));
            }
        },

        begin: function() {
            if (!initialized) {
                throw (new Error("Attempted to begin queue execution before initialization."));
            }
            let newQueue = queue;
            queue = [];
            promise = new Promise((resolve, reject) => {
                bfs(newQueue, resolve);
            });
            destroy(); // Immediately destroy queue once promise is resolved
            return promise;
        },

        enqueue: function(func, args, then, complete) {
            if (typeof func !== 'function') {
                throw (new Error("Invalid argument passed to enqueue. Func must be a function returning a promise."));
            } else if (typeof args !== 'object') {
                throw (new Error("Invalid argument passed to enqueue. Args must be an array of arguments."));
            } else if (processed >= limit) {
                throw (new Error(`Number of objects enqueued exceeds the set limit. Limit was set to ${limit}.`));
            }
            let layer = 0;
            let promise = function() {
                return func(...args);
            };
            let callback = then;
            let requeue = complete;
            try {
                addInitial(layer, promise, callback, requeue, func, args);
            } catch(err) {
                console.error(err);
            }
        },

        enqueueAll: function(func, args, then, complete) {
            args.forEach(e => this.enqueue(func, e, then, complete));
        }
    };
})();

export default $q;
