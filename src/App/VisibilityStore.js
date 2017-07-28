import WikiSearchStore from '../WikiServices/WikiSearchStore.js';

const initialVisbilityState = {
    UI: {
        mainSearch: 'true',
        leftPane: 'false',
        suggestions: 'true',
        footer: 'true',
        intro: 'true',
        header: 'true'
    }
};

const allDisabledVisibilityState = {
        mainSearch: 'false',
        leftPane: 'false',
        suggestions: 'false',
        footer: 'false',
        intro: 'false',
        header: 'false'
};

function UI(state = initialVisbilityState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
