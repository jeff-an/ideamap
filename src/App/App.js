import React, { Component } from 'react';
import { Provider } from 'react-redux';

import HeaderBar from '../Header/HeaderBar.jsx';
import Body from '../Main/MainBody.jsx';
import store from '../Store/CentralStore.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store = {store}>
        		<div className="app" id="app">
                    <HeaderBar/>
                    <Body/>
                </div>
            </Provider>
        );
    }
}

export default App;
