import React from 'react';
import $ from 'jquery';
import './MainSearchBox.css';
import MainSearchBar from './SearchBar.jsx';

let bullet = String.fromCharCode(9679);

class MainSearchBox extends React.Component {
    render() {
        return (
            <div className = 'main-search-box well well-lg'>
                <SearchIntro group = "main-search"/>
                <br/>
                <MainSearchBar group = "main-search"/>
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
            $('.main-search-box').css('min-height', '385px');
            $('.main-search-box').css('height', '50%');
            this.setState(prev => ({
                displayExamples: "block"
            }));
        } else {
            $('.main-search-box').css('min-height', '300px');
            $('.main-search-box').css('height', '45%');
            this.setState(prev => ({
                displayExamples: "none"
            }));
        }
    }

    render() {
        return (
            <div className = {this.props.group + '-intro'}>
                <h3 style = {{ marginTop: '25px'}}>Simple, Smart</h3>
                <h1 style = {{ margin: '0 0 5 0'}}>
                    Concept Mapping.
                </h1>
                <br/>
                <div className = "bold-font">
                    <a>Instructions</a>
                </div>
                <div className="regular-font-lg" style = {{ margin: '0 0 5 0'}} >
                    IdeaMap finds ideas related to your topic and uses them to construct concept maps. Click
                    {' '} <a onClick = { this.toggleExamples }>here</a> {' '}
                    to view examples.
                </div>
                <div id='search-examples' style={{ display:this.state.displayExamples }} className="regular-font-lg">
                    <div>{bullet}  <a>Trigonometry</a></div>
                    <div>{bullet}  <a>World War II</a></div>
                    <div>{bullet}  <a>Game of Thrones</a></div>
                </div>
            </div>
        );
    }

}

export { MainSearchBox as default };
