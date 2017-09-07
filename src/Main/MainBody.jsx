import React from 'react';
import $ from 'jquery';
import fade from 'fade';
import { connect } from 'react-redux';

import MainSearchBox from './MainSearchBox.jsx';
import MainGraphBox from '../Graph/MainGraphBox.jsx';
import SearchResults from './SearchResults.jsx';
import {buildGraphModel} from '../Graph/ModelBuilder.js';

/** Pages **/
import AboutPage from '../Pages/About.jsx';
import HowItWorksPage from '../Pages/HowItWorks.jsx';

import './MainBody.css';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.pages = {
            AboutPage: AboutPage,
            HowItWorksPage: HowItWorksPage,
        };
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onExampleSelect = this.onExampleSelect.bind(this);
        this.onArticleSelect = this.onArticleSelect.bind(this);
    }

    onSearchSubmit() {
        // Visual cues
        let searchBox = document.querySelector('.main-search-box');
        fade.out(searchBox, 200, () => {
            if (!this.props.UI.searchResultsBox) {
                this.props.showSearchResultsBox();
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
        fade.out(searchBox, 200, () => {
            if (!this.props.UI.mainGraphBox) {
                this.props.showMainGraphBox();
            } else {
                console.error("Triggered article select while graph box is already rendered.");
            }
        });
    }

    onArticleSelect(articleObj) {
        this.props.clearGraphModel();
        buildGraphModel(articleObj, 1);

        // Visual cues
        fade.out($('.search-results-box').get(0), 200, () => {
            if (!this.props.UI.mainGraphBox) {
                this.props.showMainGraphBox();
            } else {
                console.error("Triggered article select while graph box is already rendered.");
            }
        });
    }

    render() {
        if (!this.props.UI.page) {
            return (
                <div className="main-body">

                    {/** Elements in the main page **/}

                    {this.props.UI.mainSearchBox ?
                        <MainSearchBox
                            key={this.props.UI.mainSearchBoxKey}
                            onExampleSelect={this.onExampleSelect}
                            handleSubmit={this.onSearchSubmit}
                        />
                    : ""}

                    {this.props.UI.searchResultsBox ?
                        <SearchResults
                            onArticleSelect={this.onArticleSelect}
                            key={this.props.UI.searchResultsBoxKey}
                        />
                    : ""}

                    {this.props.UI.mainGraphBox ?
                        <MainGraphBox key={this.props.UI.mainGraphBoxKey}/>
                    : ""}

                </div>
            );
        } else {
            let Page = eval(this.pages[this.props.UI.page]);
            return (
                <Page/>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapDispatchToProps = function(dispatch) {
    let elements = ['mainSearchBox', 'searchResultsBox', 'mainGraphBox'];
    let actions = {
        clearGraphModel: () => dispatch({
            type: 'CLEAR_GRAPH_MODEL',
        }),
    };
    elements.forEach(element => actions['show' + element.charAt(0).toUpperCase() + element.slice(1)] = () => dispatch({
        type: 'SHOW_ELEMENT',
        element: element,
    }));
    elements.forEach(element => actions['destroy' + element.charAt(0).toUpperCase() + element.slice(1)] = () => dispatch({
        type: 'DESTROY_ELEMENT',
        element: element,
    }));
    return actions;
};

const MainBody = connect(mapStateToProps, mapDispatchToProps)(Body);

export default MainBody;
