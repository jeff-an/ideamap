import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.js';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import { buildGraphModel } from './Graph/ModelBuilder.js';
import store from './Store/CentralStore.js';

/*
buildGraphModel({
    title: 'Linear algebra',
    uri: 'Linear_algebra',
    summary: "Linear algebra is great!"
}, 1);*/

ReactDOM.render(<App />, document.getElementById('root'), function() {
    $('#SearchBarInput').focus();
});

// Tests
/*
analyzeSingleArticle("malus").then(function(data) {
    console.log(data);
});
getAllWordFrequencies(["hello", "world"]).then(function(data) {
    console.log(data);
}); */

registerServiceWorker();
