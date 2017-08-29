const initialState = {
    mainSearchBox: 'block',
    searchResultsBox: 'none', // -> block
    mainGraphBox: 'none', // -> flex
    graphKey: "0.5448825617480129",
};

const UIReducer = function(action, state = initialState) {
    switch(action.type) {
        case 'SHOW_SEARCH_RESULTS':
            return {
                mainSearchBox: 'none',
                searchResultsBox: 'block',
                mainGraphBox: 'none'
            };

        case 'SHOW_MAIN_BOX':
            return {
                mainSearchBox: 'block',
                searchResultsBox: 'none',
                mainGraphBox: 'none'
            };

        case 'SHOW_GRAPH_BOX':
            return {
                mainSearchBox: 'none',
                searchResultsBox: 'none',
                mainGraphBox: 'flex'
            };

        // jshint ignore:start
        case 'RESET_GRAPH_BOX':
            return {
                ...state,
                graphKey: Math.random().toString()
            };
        // jshint ignore:end

        default:
            return state;
    }
};

export default UIReducer;
