import React from 'react';
import './MainSearchBox.css';
import MainSearchBar from './SearchBar.jsx';

class MainSearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className = 'main-search-box well well-lg'>
                <SearchIntro group = "main-search"/>
                <MainSearchBar group = "main-search"/>
            </div>
        );
    }
}

class SearchIntro extends React.Component {
    render() {
        return (
            <div className = {this.props.group + '-intro'}>
                <h1><h3>Simple, Smart</h3>Concept Mapping.</h1>
                <br/>
            </div>
        );
    }
}

export { MainSearchBox as default };
