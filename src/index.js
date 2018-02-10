import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.js';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import { buildGraphModel } from './Graph/ModelBuilder.js';
import store from './Store/CentralStore.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

window.findReact = function(dom) {
    for (var key in dom) {
        if (key.startsWith("__reactInternalInstance$")) {
            var compInternals = dom[key]._currentElement;
            var compWrapper = compInternals._owner;
            var comp = compWrapper._instance;
            return comp;
        }
    }
    return null;
};

/*
buildGraphModel({
    title: 'Linear algebra',
    uri: 'Linear_algebra',
    summary: "Linear algebra is great!"
}, 1);*/

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'), function() {
    $('#SearchBarInput').focus();
});

// Tests & other dev stuff
/*
analyzeSingleArticle("malus").then(function(data) {
    console.log(data);
});
getAllWordFrequencies(["hello", "world"]).then(function(data) {
    console.log(data);
});

registerServiceWorker();
*/
