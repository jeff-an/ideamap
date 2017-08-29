import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import fade from 'fade';

import { buildGraphModel } from '../Graph/ModelBuilder.js';

import 'bootstrap/dist/css/bootstrap.css';
import './SearchResults.css';
import backButton from '../Misc/img/back-button.png';

class SearchResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.onArticleSelect = this.onArticleSelect.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.query === undefined || nextProps.query === "") {
            // Empty or valid data
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        $('.search-results-box').css({
            height: '150px',
            display: 'block'
        });
        let newHeight = 60 * nextProps.total + 160;
        $('.search-results-box').animate({
            height: newHeight + 'px',
        }, 350);
    }

    onArticleSelect(index) {
        let articleInfo = this.props.titleSearch.byId[index];
        let articleObj = {
            title: articleInfo.title,
            uri: articleInfo.uri,
            summary: articleInfo.summary
        };
        this.props.onArticleSelect(articleObj);
    }

    handleBackButton() {
        let resultsBox = document.querySelector('.search-results-box');
        fade.out(resultsBox, 200, function() {
            let mainBox = document.querySelector('.main-search-box');
            fade.in(mainBox, 200, function() {
                this.props.showMainBox();
            });
        });
    }

    render() {
        return (
            <div className="well well-lg search-results-box">
                <div style={{ display: 'inline-flex', alignItems: 'center', cursor:'pointer' }} onClick={this.handleBackButton}>
                    <img src={backButton} height="25" width="25" />
                    <span style={{ fontSize: '14px' }}> Back </span>
                </div>
                <hr/>
                <h1>Search Results:</h1>
                <div style={{ marginBottom: '10px', paddingLeft:'5px' }}>
                {"Choose a topic to generate a concept map for. If you don't see your topic, try finding it on Wikipedia first and then entering the article title here."}
                </div>
                <div className = "list-group">
                {this.props.titleSearch.byId.map((result, index) =>
                    <SearchResult
                        key={result.title}
                        index={index}
                        title={result.title}
                        summary={result.summary}
                        onArticleSelect={this.onArticleSelect}
                    />
                )}
                </div>
            </div>
        );
    }
}

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        e.preventDefault();
        this.props.onArticleSelect(this.props.index);
    }
    render() {
        return (
            <a className = "list-group-item list-group-item-action align-items-start" onClick={this.onClick} style={{ width: '100%', cursor: 'pointer' }}>
                <div className="search-result-title"> {this.props.title} </div>
                {this.props.summary.length < 110 ? this.props.summary : this.props.summary.substring(0, 110) + "..."}
            </a>
        );
    }
}

const mapStateToProps = (state) => ({
    titleSearch: state.titleSearch,
    display: state.UI.searchResultsBox
});

const mapDispatchToProps = (dispatch) => ({
    showMainBox: () => dispatch({
        type: 'SHOW_MAIN_BOX'
    }),
});
const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);
export default SearchResults;
