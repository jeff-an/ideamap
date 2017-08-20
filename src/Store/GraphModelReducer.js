const initialState = {
    nodes: {
        all: [],
        byId: {}
    },
    connections: [],
    subnodes: {
        all: [],
        byId: {}
    },
    status: 'pending',
    meta: {},
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
                subnodes: {
                    all: state.subnodes.all.concat(action.subnodes.all),
                    byId: Object.assign(state.nodes.byId, action.nodes.byId)
                },
                status: 'success',
                meta: action.meta,
                debug: {}
            };

        case 'CLEAR_GRAPH_MODEL':
            return initialState;

        case 'GRAPH_MODEL_GEN_FAILURE':
            return Object.assign(initialState, {
                status: 'failure',
                meta: action.meta,
                debug: {
                    query: action.query,
                    error: action.error
                }
            });

        default:
            return state;
    }
}

export default graphModelReducer;
