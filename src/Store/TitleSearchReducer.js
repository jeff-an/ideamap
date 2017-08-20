const initialState = {
    query: "",
    total: 0,
    // Each item in result is an object holding title, description, and uri
    byId: [],
    allResults: []
};

function titleSearchReducer(state = initialState, action) {
    switch(action.type) {
        case 'TITLE_SEARCH_RESULT':
            let data = action.data;
            let results = [];
            let regex = /\/wiki\//; // Used to extract the URI from the URL

            // Group search results according to title
            for (let i = 0; i < data[1].length; ++i) {
                results.push({
                    Id: i,
                    title: data[1][i],
                    summary: data[2][i],
                    uri: (decodeURIComponent(data[3][i]).split(regex))[1]
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

export default titleSearchReducer;
