import React from 'react';
import './MainSearchBox.css';
import MainSearchBar from './SearchBar.jsx';

let bullet = String.fromCharCode(9679);

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
                <br/>
                <MainSearchBar group = "main-search"/>
            </div>
        );
    }
}

class SearchIntro extends React.Component {
    render() {
        return (
            <div className = {this.props.group + '-intro'}>
                <h3>Simple, Smart</h3>
                <h1 style={{ margin: '0'}}>
                    Concept Mapping.
                </h1>
                <br/>
                <br/>
                <div className="regular-font" >
                    IdeaMap generates concept maps showing related and relevant topics according to statistical analysis.
                </div>
                <br/>
                <div className="bold-font">
                    Examples:
                </div>
                <div className="regular-font">
                    <div>{bullet}  <a>Trigonometry</a></div>
                    <div>{bullet}  <a>World War II</a></div>
                    <div>{bullet}  <a>Game of Thrones</a></div>
                </div>
            </div>
        );
    }
}

export { MainSearchBox as default };
