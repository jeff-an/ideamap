import { createStore } from 'redux';

const initialState = {
    query: "",
    total: 0,
    // Each item in result is an object holding title, description, and link
    byId: [],
    allResults: []
};

function titleSearch(state = initialState, action) {
    switch(action.type) {
        case 'TITLE_SEARCH_RESULT':
            let data = action.data;
            let results = [];
            // Group search results according to title
            for (let i = 0; i < data[1].length; ++i) {
                results.concat({
                    Id: i,
                    title: data[1][i],
                    description: data[2][i],
                    link: data[3][i]
                });
            }
            return {
                query: action.query,
                total: results.length,
                byId: results,
                allResults: data[1]
            };
        default:
            return state;
    }
}

let store = createStore(titleSearch);

export default store;
