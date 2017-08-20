import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import fade from 'fade';

import store from '../Store/CentralStore.js';
import { buildGraphModel } from '../Graph/ModelBuilder.js';

import 'bootstrap/dist/css/bootstrap.css';
import './SearchResults.css';
import backButton from '../Misc/img/back-button.png';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
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
        this.setState({
            query: "",
            total: 0,
            byId: [],
            allResults: []
        });
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
        let articleInfo = this.props.byId[index];
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
            resultsBox.style.display = 'none';
        });
        let mainBox = document.querySelector('.main-search-box');
        fade.in(mainBox, 200, function() {
            mainBox.style.display = 'block';
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
                {this.props.byId.map((result, index) =>
                    <a key={index} className = "list-group-item list-group-item-action align-items-start" onClick={this.onArticleSelect.bind(this, index)} style={{ width: '100%', cursor: 'pointer' }}>
                        <div className="search-result-title"> {result.title} </div>
                        {result.summary.length < 110 ? result.summary : result.summary.substring(0, 110) + "..."}
                    </a>
                )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => state.titleSearch;
const VisibleSearchResults = connect(mapStateToProps)(SearchResults);
export default VisibleSearchResults;
