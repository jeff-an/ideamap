import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import fade from 'fade';

import { buildGraphModel } from '../Graph/ModelBuilder.js';

import 'bootstrap/dist/css/bootstrap.css';
import './SearchResults.css';

class SearchResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
        };
        this.handleBackButton = this.handleBackButton.bind(this);
        this.onArticleSelect = this.onArticleSelect.bind(this);
    }

    componentDidMount() {
        let resultsBox = document.querySelector('.search-results-box');
        fade.in(resultsBox, 150, () => {
            this.setState({
                opacity: 1,
            });
            if (this.props.titleSearch.total > 0) {
                let newHeight = 65 * this.props.titleSearch.total + 160;
                $('.search-results-box').animate({
                    height: newHeight + 'px',
                }, 200);
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.titleSearch.total !== prevProps.titleSearch.total) {
            let newHeight = 60 * this.props.titleSearch.total + 160;
            $('.search-results-box').animate({
                height: newHeight + 'px',
            }, 200);
        }
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
        fade.out(resultsBox, 200, () => {
            this.props.showMainBox();
        });
    }

    render() {
        return (
            <div className="well well-lg search-results-box" style={{ opacity: this.state.opacity }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', cursor:'pointer' }} onClick={this.handleBackButton}>
                    <i className="material-icons md-dark md-48"> arrow_back </i>
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
        type: 'SHOW_ELEMENT',
        element: 'mainSearchBox',
    }),
});
const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);
export default SearchResults;
