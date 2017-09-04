const initialState = {
    mainSearchBox: true,
    searchResultsBox: false, // -> block
    mainGraphBox: false, // -> flex
    aboutPage: false,
    howItWorksPage: false,
    mainGraphBoxKey: "0.5448825617480129",
    mainSearchBoxKey: "0.7326552280521936",
    searchResultsBoxKey: "0.30287281086816953",
};

const UIReducer = function(state = initialState, action) {
    switch(action.type) {
        // jshint ignore:start
        case 'SHOW_PAGE':
            return {
                ...initialState,
                mainGraphBoxKey: Math.random().toString(),
                mainSearchBoxKey: Math.random().toString(),
                searchResultsBoxKey: Math.random().toString(),
                [action.pageName]: true,
            };

        case 'SHOW_ELEMENT':
            return {
                ...state,
                aboutPage: false,
                howItWorksPage: false,
                mainSearchBox: false,
                searchResultsBox: false,
                mainGraphBox: false,
                [action.element]: true,
                [action.element + 'Key']: Math.random().toString(),
            };

        case 'DESTROY_ELEMENT':
            return {
                ...state,
                [action.element]: false,
            };
        // jshint ignore:end

        default:
            return state;
    }
};

export default UIReducer;
