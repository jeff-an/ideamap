import React from 'react';
import $ from 'jquery';
import fade from 'fade';

import MainSearchBox from './MainSearchBox.jsx';
import MainGraphBox from '../Graph/MainGraphBox.jsx';
import SearchResults from './SearchResults.jsx';
import {buildGraphModel} from '../Graph/ModelBuilder.js';

import './MainBody.css';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onExampleSelect = this.onExampleSelect.bind(this);
    }

    onSearchSubmit() {
        // Visual cues
        let searchBox = document.querySelector('.main-search-box');
        fade.out(searchBox, 200, function() {
            if (this.state.UI.searchResultsBox === 'none') {
                this.props.showGraphBox();
            } else {
                console.error("Triggered search results render while search results box is already rendered.");
            }
        });
    }

    onExampleSelect(articleObj) {
        // Fire async action
        this.props.clearGraphModel();
        buildGraphModel(articleObj, 1);

        // Visual cues
        let searchBox = document.querySelector('.main-search-box');
        fade.out(searchBox, 200, function() {
            if (this.state.UI.mainGraphBox === 'none') {
                this.props.showGraphBox();
            } else {
                console.error("Triggered article select while graph box is already rendered.");
            }
        });
    }

    onArticleSelect() {
        this.props.clearGraphModel();
        buildGraphModel(articleObj, 1);

        // Visual cues
        fade.out($('.search-results-box').get(0), 200, function() {
            if (this.state.UI.mainGraphBox === 'none') {
                this.props.showGraphBox();
            } else {
                console.error("Triggered article select while graph box is already rendered.");
            }
        });
    }

    render() {
        return (
            <div className="main-body">

                <MainSearchBox
                    style={{ display: this.props.UI.mainSearchBox }}
                    onExampleSelect={this.onExampleSelect}
                    handleSubmit={this.onSearchSubmit}
                />

                <SearchResults
                    onArticleSelect={this.onArticleSelect}
                />

                <MainGraphBox key={this.props.UI.graphKey}/>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapDispatchToProps = function(dispatch) {
    let actions = {
        clearGraphModel: 'CLEAR_GRAPH_MODEL',
        showMainBox: 'SHOW_MAIN_BOX',
        showGraphBox: 'SHOW_GRAPH_BOX',
        showSearchResults: 'SHOW_SEARCH_RESULTS',
        resetGraphBox: 'RESET_GRAPH_BOX',
    };
    Object.keys(actions).forEach(key => actions.key = dispatch({
        type: actions.key
    }));
    return actions;
};

const MainBody = connect(mapStateToProps, mapDispatchToProps)(Body);

export default MainBody;
