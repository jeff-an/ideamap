import { createStore } from 'redux';

const initialState = {
    searchString: "",
    total: 0,
    results: [],
};

function wikiSearch(state = initialState, action) {
    switch(action.type) {
        case 'SEARCH_RESULT':
            let searchResult = action.response;
            return {
                query: action.query,
                total: searchResult.length,
                results: searchResult
            };
        default:
            return state;
    }
}

let store = createStore(wikiSearch);

export default store;
