const initialState = {
    total: 0,
    center: {
        // Node
    },
    byId: [
        // [Node ...]
    ],
    byLayer: {
        // {0: [Node ...]}
    },
    connections: {
        byId: [
            // [Link ...]
        ],
        byLayer: {
            // {0: [Link ...]}
        }
    }
};

function GraphModel(state = initialState, action) {
    switch(action.type) {
        /*
        * Expecting
        */
        case 'MAKE_MODEL':


    }
}
