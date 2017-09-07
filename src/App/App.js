import React, { Component } from 'react';
import { Provider } from 'react-redux';
import $ from 'jquery';

import HeaderBar from '../Header/HeaderBar.jsx';
import Body from '../Main/MainBody.jsx';
import store from '../Store/CentralStore.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store = {store}>
        		<div className="app"
                id="app"
            >
            <img id="bg-image" src="http://s3.ca-central-1.amazonaws.com/ideamap.ca/background.jpg" width="100%" height="100%"></img>
                    <HeaderBar/>
                    <Body/>
                </div>
            </Provider>
        );
    }
}

export default App;
