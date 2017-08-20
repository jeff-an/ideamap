import React from 'react';
import $ from 'jquery';
import fade from 'fade';

import MainSearchBox from './MainSearchBox';
import MainGraphBox from './MainGraphBox';
import VisibleSearchResults from './SearchResults';
import getTopMatchingArticles from '../Services/TitleSearchService.js';
import store from '../Store/CentralStore.js';
import {buildGraphModel} from '../Graph/ModelBuilder.js';

import './MainBody.css';

class MainBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addedChildName: "None",
            addedChild: null
        };
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    renderSearchResults() {
        if (this.state.addedChild === null) {
            this.setState({
                addedChildName: 'SearchResults',
                addedChild: <VisibleSearchResults onArticleSelect={(articleObj) => this.onArticleSelect(articleObj)}/>
            });
        }
        $('.search-results-box').css('display', 'none');
        $('.search-results-box').css('opacity', '1'); // Remove any previous opacity setting
    }

    onSearchSubmit(searchText) {
        if (searchText.length < 3) {
            alert('Please enter at least three characters.');
            return;
        }
        // Begin async action to get search results
        getTopMatchingArticles(searchText);

        // Visual cues
        let searchBox = document.querySelector('.main-search-box');
        fade.out(searchBox, 200, function() {
            searchBox.style.display = 'none';
        });
        this.renderSearchResults();
    }

    onArticleSelect(articleObj) {
        fade.out($('.search-results-box').get(0), 200);
        if (this.state.addedChildName !== 'Graph') {
            this.setState({
                addedChildName: 'Graph',
                addedChild: <MainGraphBox />
            });
            store.dispatch({
                type: 'CLEAR_GRAPH_MODEL'
            });
        } else {
            console.error("Triggered article select while graph box is already rendered.");
        }
        buildGraphModel(articleObj, 0);
    }

    render() {
        return (
            <div className="main-body">
                <MainSearchBox handleSubmit={(query) => this.onSearchSubmit(query)}/>
                {this.state.addedChild}
            </div>
        );
    }
}

export default MainBody;
