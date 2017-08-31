import titleSearch from './TitleSearchReducer.js';
import graphModel from './GraphModelReducer.js';
import UI from './UIReducer.js';
import graphUI from './GraphUIReducer.js';
import { combineReducers, createStore } from 'redux';

let centralReducer = combineReducers({
    titleSearch,
    graphModel,
    UI,
    graphUI,
});

let store = createStore(centralReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
