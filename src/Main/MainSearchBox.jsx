import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import fade from 'fade';

import getTopMatchingArticles from '../Services/TitleSearchService.js';

import './SearchBar.css';
import './MainSearchBox.css';

/** Global variables **/

const bullet = String.fromCharCode(9679);

/** Components **/

class MainSearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0
        };
    }

    componentDidMount() {
        let mainSearchBox = document.querySelector('.main-search-box');
        fade.in(mainSearchBox, 200, () => {
            this.setState({
                opacity: 1
            });
        });
    }

    render() {
        return (
            <div className = 'well well-lg main-search-box' style={{ opacity: this.state.opacity }}>
                <SearchIntro onExampleSelect={this.props.onExampleSelect}/>
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
        this.examples = [
            {
                title:'Trigonometry',
                uri: 'Trigonometry',
                summary: 'Trigonometry (from Greek trigōnon, "triangle" and metron, "measure") is a branch of mathematics that studies relationships involving lengths and angles of triangles.'
            },
            {
                title: 'World War II',
                uri: 'World_War_II',
                summary: "World War II (often abbreviated to WWII or WW2), also known as the Second World War, was a global war that lasted from 1939 to 1945, although related conflicts began earlier. It involved the vast majority of the world's countries—including all of the great powers—eventually forming two opposing military alliances: the Allies and the Axis."
            },
            {
                title: 'Game of Thrones',
                uri: 'Game_of_thrones',
                summary: "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones."
            }
        ];
        this.toggleExamples = this.toggleExamples.bind(this);
        this.broadcastExampleSelect = this.broadcastExampleSelect.bind(this);
    }

    broadcastExampleSelect(id) {
        let articleObj = this.examples[id];
        this.props.onExampleSelect(articleObj);
    }

    toggleExamples() {
        if (this.state.displayExamples === 'none') {
            $('.main-search-box').css('max-height', '450px');
            $('.main-search-box').css('min-height', '390px');
            $('.main-search-box').css('height', 'calc(40% + 150px)');
            $('.main-search').css('top', 'calc(28% + 140px)');
            this.setState(prev => ({
                displayExamples: "block"
            }));
        } else {
            $('.main-search-box').css('max-height', '380px');
            $('.main-search-box').css('min-height', '320px');
            $('.main-search-box').css('height', 'calc(35% + 150px)');
            $('.main-search').css('top', 'calc(33% + 85px)');
            this.setState(prev => ({
                displayExamples: "none"
            }));
        }
    }

    render() {
        return (
            <div className = "main-search-intro">
                <h4><b>I</b>ntelligent <b>DE</b>finition <b>A</b>ssociative</h4>
                <h1>
                    Concept Mapping.
                </h1>
                <br/>
                <div className = "bold-font">
                    <a>Instructions</a>
                </div>
                <div className = "regular-font-lg" style = {{ margin: '0 0 5 0', whiteSpace: 'nowrap !important'}} >
                    IdeaMap finds ideas related to your topic and uses them to construct concept maps. Click
                    {' '} <a onClick = { this.toggleExamples }>here</a> {' '}
                    to view examples.
                </div>
                <div id = 'search-examples' style = {{ display:this.state.displayExamples }} className = "regular-font-lg">
                    <div style = {{ height: '5px' }}/>
                    {this.examples.map((articleObj, index) => {
                        return (
                            <SearchExample
                                broadcastExampleSelect={this.broadcastExampleSelect}
                                key={articleObj.title}
                                exampleName={articleObj.title}
                                id={index}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

class SearchExample extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.broadcastExampleSelect(this.props.id);
    }
    render() {
        return (
            <div onClick={this.onClick}> {bullet} <a> {this.props.exampleName} </a> </div>
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

    handleChange(e) {
        this.setState({ value: e.target.value });
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
            <div className = "main-search">
                <form className = "main-search-form" onSubmit={this.handleSubmit}>
                    <SearchBarInput handleChange = {this.handleChange} />
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
                    value = {this.state.value}
                    type = "search"
                    className = "form-control"
                    autoCapitalize = "words"
                    maxLength = "30"
                    placeholder = {this.state.placeholder}
                    onChange = {this.props.handleChange}
                    autoComplete = "off" />
            </div>
        );
    }
}

class SearchBarButton extends React.Component {
    render() {
        return (
            <div className="button-container">
                <Button className = "btn-responsive btn btn-primary main-search-submit" type="submit">
                    <p style={{ margin: 0, }}>Generate</p>
                </Button>
            </div>
        );
    }
}

export default MainSearchBox;
