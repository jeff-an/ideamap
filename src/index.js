import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';
import App from './App/App.js';
import { default as gma } from './Services/TitleSearchService.js';
import { analyzeSingleArticle } from './Services/DocumentService.js';
import { getAllWordFrequencies } from './Services/WordSearchService.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'), function() {
    $('#SearchBarInput').focus();
});

// Tests
analyzeSingleArticle("earth").then(function(data) {
    console.log(data);
});
getAllWordFrequencies(["hello", "world"]).then(function(data) {
    console.log(data);
});

registerServiceWorker();
