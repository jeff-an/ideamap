import React from 'react';
import $ from 'jquery';
import fade from 'fade';
import { Button } from 'react-bootstrap';

import getTopMatchingArticles from '../Services/TitleSearchService.js';

import './SearchBar.css';
import './MainSearchBox.css';

let bullet = String.fromCharCode(9679);

class MainSearchBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className = 'well well-lg main-search-box'>
                <SearchIntro />
                <br/>
                <SearchBar handleSubmit={this.props.handleSubmit}/>
            </div>
        );
    }
}

class SearchIntro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayExamples: "none"
        };
        this.toggleExamples = this.toggleExamples.bind(this);
    }

    toggleExamples() {
        if (this.state.displayExamples === 'none') {
            $('.main-search-box').css('min-height', '390px');
            $('.main-search-box').css('height', '47%');
            this.setState(prev => ({
                displayExamples: "block"
            }));
        } else {
            $('.main-search-box').css('min-height', '320px');
            $('.main-search-box').css('height', '45%');
            this.setState(prev => ({
                displayExamples: "none"
            }));
        }
    }

    render() {
        return (
            <div className = "main-search-intro">
                <h4 style = {{ marginTop: '5px'}}><b>I</b>ntelligent <b>DE</b>finition <b>A</b>ssociative</h4>
                <h1 style = {{ margin: '0 0 5 0', fontSize: '40px', fontFamily: 'Montserrat Light, sans-serif' }}>
                    Concept Mapping.
                </h1>
                <br/>
                <div className = "bold-font">
                    <a>Instructions</a>
                </div>
                <div className = "regular-font-lg" style = {{ margin: '0 0 5 0'}} >
                    IdeaMap finds ideas related to your topic and uses them to construct concept maps. Click
                    {' '} <a onClick = { this.toggleExamples }>here</a> {' '}
                    to view examples.
                </div>
                <div id = 'search-examples' style = {{ display:this.state.displayExamples }} className = "regular-font-lg">
                    <div style = {{ height: '5px' }}/>
                    <div>{bullet}  <a>Trigonometry</a></div>
                    <div>{bullet}  <a>World War II</a></div>
                    <div>{bullet}  <a>Game of Thrones</a></div>
                </div>
            </div>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(newVal) {
        this.setState({ value: newVal });
    }

    handleSubmit(e) {
        e.preventDefault();
        let searchText = this.state.value;
        if (searchText.length < 3) {
            alert('Please enter at least three characters.');
            return;
        }
        // Begin async action to get search results
        getTopMatchingArticles(searchText);
        this.props.handleSubmit();
    }

    render() {
        return (
            <div className = "main-search clear-fix">
                <form className = "main-search-form" onSubmit={this.handleSubmit}>
                    <SearchBarInput handleChange = {(value) => this.handleChange(value)} />
                    <SearchBarButton />
                </form>
            </div>
        );
    }
}

class SearchBarInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: "Enter a concept..."
        };
    }

    render() {
        return (
            <div className = "main-search-bar">
                <span className = "fa fa-search fa-lg"></span>
                <input
                    type = "search"
                    className = "form-control"
                    autoCapitalize = "words"
                    maxLength = "30"
                    placeholder = {this.state.placeholder}
                    onChange = {(event) => this.props.handleChange(event.target.value)}
                    autoComplete = "off" />
            </div>
        );
    }
}

class SearchBarButton extends React.Component {
    render() {
        return (
            <div className = "main-search-submit">
                <Button className = "btn btn-primary" type="submit">
                Generate
                </Button>
            </div>
        );
    }
}

export default MainSearchBox;