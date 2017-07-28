import React, { Component } from 'react';
import logo from '../Misc/img/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { default as MainSearchBar } from '../Search/SearchBar.jsx';
import { default as MainSearchBox } from '../Search/BackgroundBox.jsx';

class App extends Component {
  render() {
    return (
		<div className="app">
		<div className="app-header-bar">
			<div className="app-logo-container">
				<img src={logo} className="app-logo" alt="logo" />
			</div>
			<div className="app-title">
				<p style={{margin:0}}>IdeaMap</p>
			</div>
		</div>
        <div className="main-body">
            <div className="search-box">
                <MainSearchBar name = "SearchForm"/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
