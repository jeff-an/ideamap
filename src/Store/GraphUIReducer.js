const initialState = {
    toolsPane: false,
    titleText: false,
};

function graphUIReducer(state = initialState, action) {
    switch(action.type) {
        // jshint ignore:start
        case 'GRAPH_GEN_COMPLETE':
            return {
                ...state,
                toolsPane: true,
                titleText: true,
            };
        // jshint ignore:end
        default:
            return state;
    }
}

export default graphUIReducer;
