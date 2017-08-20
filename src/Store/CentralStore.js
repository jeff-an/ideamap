import titleSearch from './TitleSearchReducer.js';
import graphModel from './GraphModelReducer.js';
import { combineReducers, createStore } from 'redux';
import { connect } from 'react-redux';
import ConceptMap from '../Graph/ConceptMap.jsx';

let centralReducer = combineReducers({
    titleSearch,
    graphModel
});

let store = createStore(centralReducer);

export default store;
