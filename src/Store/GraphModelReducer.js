const initialState = {
    nodes: {
        all: [],
        byId: {}
    },
    connections: [],
    subnodes: {},
    status: 'pending',
    debug: {}
};

function graphModelReducer(state = initialState, action) {
    switch(action.type) {
        case 'GRAPH_MODEL_GEN_SUCCESS':
            return {
                nodes: {
                    all: state.nodes.all.concat(action.nodes.all),
                    byId: Object.assign(state.nodes.byId, action.nodes.byId)
                },
                connections: state.connections.concat(action.connections),
                subnodes: Object.assign(state.subnodes, action.subnodes),
                status: 'success',
                debug: state.debug
            };

        /* jshint ignore:start */
        case 'GRAPH_MODEL_GEN_FAILURE':
            return {
                ...state,
                debug: {
                    query: action.query,
                    error: action.error
                }
            };
            /* jshint ignore:end */

        default:
            return state;
    }
}

export default graphModelReducer;
