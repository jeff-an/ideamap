import WikiSearchStore from '../WikiServices/WikiSearchStore.js';

const initialVisbilityState = {
    UI: {
        mainSearch: 'true',
        intro: 'true',
        header: 'true'
    }
};

const allDisabledVisibilityState = {
        mainSearch: 'false',
        intro: 'false',
        header: 'false'
};

function UI(state = initialVisbilityState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
