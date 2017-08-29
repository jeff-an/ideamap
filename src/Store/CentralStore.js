import titleSearch from './TitleSearchReducer.js';
import graphModel from './GraphModelReducer.js';
import UI from './UIReducer.js';
import { combineReducers, createStore } from 'redux';

let centralReducer = combineReducers({
    titleSearch,
    graphModel,
    UI,
});

let store = createStore(centralReducer);

export default store;
