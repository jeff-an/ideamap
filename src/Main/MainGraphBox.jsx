import React from 'react';
import $ from 'jquery';
import fade from 'fade';
import { connect } from 'react-redux';

import renderGraph from '../Graph/ConceptMap.jsx';
import store from '../Store/CentralStore.js';
import './MainGraphBox.css';

import { nodes, connections } from './map.json';

class GraphRoot extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div className = "graph-root well" id = "GraphRoot"> </div>
        );
    }
}

const initialState = {
    isDisplayed: true,
    isLoading: false,
    isGraphDisplayed: false,
    isErrorDisplayed: false,
    isInitialized: false
};

class GraphBox extends React.Component {
    constructor() {
        super();
        this.state = initialState;
        this.onGraphLoad = this.onGraphLoad.bind(this);
        this.resetBoxVisibility = this.resetBoxVisibility.bind(this);
        this.animateInitialRender = this.animateInitialRender.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status === 'pending' || this.state.isInitialized) {
            // Still loading or already finished
            return false;
        }
        return true;
    }

    // Callback for graph generation result changes
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, nextState);
        if (nextProps.status === 'success') {
            this.onGraphLoad();
        }
        // TODO: error handling here
    }

    onGraphLoad() {
        this.setState({
            isLoading: false,
            isInitialized: true
        });
        fade.in(document.querySelector('.graph-box'), 350, () => {
            this.setState({
                isErrorDisplayed: false,
                isGraphDisplayed: true
            });
        });
        renderGraph(nodes, connections);
        $("div[data-reactroot='']").css({
            width: '100%',
            height: '100%'
        });
    }

    resetBoxVisibility() {
        let graphBox = document.querySelector('.graph-box');
        let initialCSS = {
            top: 'calc(50% - 75px)',
            width: '200px',
            height: '150px'
        };
        Object.keys(initialCSS).forEach(e => graphBox.style[e] = initialCSS[e]);
        this.setState(initialState);
    }

    componentDidMount() {
        this.animateInitialRender();
    }

    animateInitialRender() {
        let graphBox = document.querySelector('.graph-box');
        $(graphBox).animate({
            top: '5%',
            left: '15%',
            width: '70%',
            height: '90%'
        }, 350);
        fade.in(graphBox, 350, () => {
            this.setState({
                isLoading: true
            });
        });
        console.log('done');
    }

    render() {
        return (
        <div className='well well-lg graph-box' id="GraphBox" style={{ display: this.state.isDisplayed ? 'flex' : 'none' }}>
            <div className = 'loader' style = {{ display: this.state.isLoading ? 'block' : 'none' }}></div>
            <GraphRoot />
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        status: state.graphModel.status,
        meta: state.graphModel.meta
    });
};

const mapDispatchToProps = (dispatch) => ({
    clearGraphModel: () => dispatch({
        type: 'CLEAR_GRAPH_MODEL'
    }),
});

const MainGraphBox = connect(mapStateToProps, mapDispatchToProps)(GraphBox);

export default MainGraphBox;
