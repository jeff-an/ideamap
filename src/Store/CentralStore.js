import titleSearch from './TitleSearchReducer.js';
import graphModel from './GraphModelReducer.js';
import { combineReducers, createStore } from 'redux';

let centralReducer = combineReducers({
    titleSearch,
    graphModel
});

let store = createStore(centralReducer);

export default store;
