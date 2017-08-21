import React from 'react';
import $ from 'jquery';
import fade from 'fade';
import ReactDOM from 'react-dom';
import MindMap from 'react-mindmap';
import { connect } from 'react-redux';

import './ConceptMap.css';
import store from '../Store/CentralStore.js';
import './MainGraphBox.css';


class GraphRoot extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div className = "graph-root well" id = "GraphRoot" style = {{ opacity: 0 }}> </div>
        );
    }
}

class ConceptMap extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <MindMap
            nodes={this.props.nodes}
            connections={this.props.connections}
            />
        );
    }
}

const initialState = {
    isLoading: true,
    isGraphDisplayed: false,
    isErrorDisplayed: false,
};

class GraphBox extends React.Component {
    constructor() {
        super();
        this.state = initialState;
        this.onGraphLoad = this.onGraphLoad.bind(this);
        this.resetBoxVisibility = this.resetBoxVisibility.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Tried to update");
        if (this.props != nextProps || this.state != nextState) {
            return true;
        }
    }

    // Callback for graph generation result changes
    componentDidUpdate(prevProps, prevState) {
        console.log("did update: ", prevProps, prevState);
        if (prevProps.status !== "success" && this.props.status === 'success') {
            this.onGraphLoad();
        }
        // TODO: error handling here
    }

    onGraphLoad() {
        console.log("calling on graph load");
        this.setState({
            isLoading: false,
            isErrorDisplayed: false,
            isGraphDisplayed: true,
        });
        let graphRoot = document.getElementById('GraphRoot');
        console.log(this.props.nodes);
        ReactDOM.render(
            <ConceptMap nodes = {this.props.nodes} connections = {this.props.connections} />,
            graphRoot
        );
        fade.in(graphRoot, 350, () => {
            graphRoot.style.opacity = 1;
        });
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
        let graphBox = document.querySelector('.graph-box');
        $(graphBox).animate({
            top: '5%',
            left: '15%',
            width: '70%',
            height: '90%'
        }, 350);
    }

    render() {
        return (
        <div className='well well-lg graph-box' id="GraphBox" >
            <div className = 'loader' style = {{ display: this.state.isLoading ? 'block' : 'none' }}></div>
            <GraphRoot />
        </div>
        );
    }
}

//    <ConceptMap nodes={this.props.nodes} connections={this.props.connections} style = {{ display: this.state.isGraphDisplayed ? 'block' : 'none'}} />

const mapStateToProps = (state) => {
    console.log(state);
    return ({
        status: state.graphModel.status,
        meta: state.graphModel.meta,
        nodes: state.graphModel.nodes.all,
        connections: state.graphModel.connections
    });
};

const mapDispatchToProps = (dispatch) => ({
    clearGraphModel: () => dispatch({
        type: 'CLEAR_GRAPH_MODEL'
    }),
});

const MainGraphBox = connect(mapStateToProps, mapDispatchToProps)(GraphBox);

export default MainGraphBox;
