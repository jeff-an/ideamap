import React from 'react';
import $ from 'jquery';
import fade from 'fade';

import MainSearchBox from './MainSearchBox';
import MainGraphBox from '../Graph/MainGraphBox';
import VisibleSearchResults from './SearchResults';
import store from '../Store/CentralStore.js';
import {buildGraphModel} from '../Graph/ModelBuilder.js';

import './MainBody.css';

class MainBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addedChildName: "None",
            addedChild: ""
        };
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onExampleSelect = this.onExampleSelect.bind(this);
    }

    renderSearchResults() {
        if (this.state.addedChild === "") {
            this.setState({
                addedChildName: 'SearchResults',
                addedChild: <VisibleSearchResults onArticleSelect={(articleObj) => this.onArticleSelect(articleObj)}/>
            });
        }
        $('.search-results-box').css('display', 'none');
        $('.search-results-box').css('opacity', '1'); // Remove any previous opacity setting
    }

    onSearchSubmit() {
        // Visual cues
        let searchBox = document.querySelector('.main-search-box');
        fade.out(searchBox, 200, function() {
            searchBox.style.display = 'none';
        });
        this.renderSearchResults();
    }

    onExampleSelect(articleObj) {
        // Fire async action
        store.dispatch({
            type: 'CLEAR_GRAPH_MODEL'
        });
        buildGraphModel(articleObj, 1);

        // Visual cues
        let searchBox = document.querySelector('.main-search-box');
        fade.out(searchBox, 200, function() {
            searchBox.style.display = 'none';
        });
        if (this.state.addedChildName !== 'Graph') {
            this.setState({
                addedChildName: 'Graph',
                addedChild: <MainGraphBox />
            });
        } else {
            console.error("Triggered article select while graph box is already rendered.");
        }
    }

    onArticleSelect(articleObj) {
        store.dispatch({
            type: 'CLEAR_GRAPH_MODEL'
        });
        buildGraphModel(articleObj, 1);
        fade.out($('.search-results-box').get(0), 200);
        if (this.state.addedChildName !== 'Graph') {
            this.setState({
                addedChildName: 'Graph',
                addedChild: <MainGraphBox />
            });
        } else {
            console.error("Triggered article select while graph box is already rendered.");
        }
    }

    render() {
        return (
            <div className="main-body">
                <MainSearchBox onExampleSelect={this.onExampleSelect} handleSubmit={this.onSearchSubmit}/>
                {this.state.addedChild}
            </div>
        );
    }
}

export default MainBody;
