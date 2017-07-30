import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HeaderBar from '../Header/HeaderBar.jsx';
import MainSearchBox from '../Search/MainSearchBox.jsx';

class App extends Component {
  render() {
    return (
		<div className="app">
        <HeaderBar/>
        <div className="main-body">
            <MainSearchBox/>
        </div>
      </div>
    );
  }
}

export default App;
