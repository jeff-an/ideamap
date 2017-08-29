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
    size: 1,
    isGraphDisplayed: false,
    isErrorDisplayed: false,
};

class GraphBox extends React.Component {
    constructor() {
        super();
        this.state = initialState;
        this.onGraphLoad = this.onGraphLoad.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.display === 'none' && nextProps.display !== 'none') {
            // Component is being initially rendered, prepare for fade animation
            $('.search-results-box').css('display', 'none');
            $('.search-results-box').css('opacity', '1');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props != nextProps || this.state != nextState) {
            return true;
        }
    }

    // Callback for graph generation result changes
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== "success" && this.props.status === 'success') {
            this.onGraphLoad();
        }
        // TODO: error handling here
    }

    onGraphLoad() {
        this.setState({
            isLoading: false,
            isErrorDisplayed: false,
            isGraphDisplayed: true,
        });
        let graphBox = document.querySelector('.graph-box');
        $(graphBox).animate({
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });
        graphBox.setAttribute('class', 'graph-box'); // Remove well classes
        let graphRoot = document.getElementById('GraphRoot');
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

const mapStateToProps = (state) => {
    return ({
        display: state.UI.mainGraphBox,
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
