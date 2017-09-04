import React from 'react';
import $ from 'jquery';
import fade from 'fade';
import ReactDOM from 'react-dom';
import MindMap from 'react-mindmap';
import { connect } from 'react-redux';

import GraphToolPane from './GraphToolPane.jsx';
import store from '../Store/CentralStore.js';
import ConceptMap from './ConceptMap.jsx';

import './MainGraphBox.css';
import './ConceptMap.css';

const initialState = {
    opacity: 0,
    isLoading: true,
    isGraphDisplayed: false,
    isErrorDisplayed: false,
    graphRef: null,
};

class GraphBox extends React.Component {
    constructor() {
        super();
        this.state = initialState;
        this.onGraphLoad = this.onGraphLoad.bind(this);
        this.downloadSource = this.downloadSource.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.toggleGraphMoveable = this.toggleGraphMoveable.bind(this);
        this.rerenderGraph = this.rerenderGraph.bind(this);
    }

    componentDidMount() {
        let graphBox = document.querySelector('.graph-box');
        fade.in(graphBox, 50, () => {
            this.setState({
                opacity: 1
            }, () => {
                $(graphBox).animate({
                    top: '5%',
                    left: '15%',
                    width: '70%',
                    height: '90%'
                }, 350);
            });
        });

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
        let graphRef = ReactDOM.render(
            <ConceptMap id="concept-map" nodes={this.props.nodes} connections={this.props.connections} />,
            graphRoot
        );
        this.setState({
            graphRef: graphRef,
        });
        this.props.showToolsAndTitle();
        fade.in(graphRoot, 350, () => {
            graphRoot.style.opacity = 1;
        });
        $("div[data-reactroot='']").css({
            width: '100%',
            height: '100%'
        });
    }

    /** Graph Tool Functions that require parent (graph box) access **/

    toggleGraphMoveable(editable) {
        this.state.graphRef.setState({
            editable: editable
        });
    }

    rerenderGraph() {
        let graphRoot = document.getElementById('GraphRoot');
        if (ReactDOM.unmountComponentAtNode(graphRoot)) {
            // Only rerender if the remove was succesful
            ReactDOM.render(
                <ConceptMap id="concept-map" nodes={this.props.nodes} connections={this.props.connections} />,
                graphRoot
            );
        }
        $("div[data-reactroot='']").css({
            width: '100%',
            height: '100%'
        });
    }

    downloadSource() {
        let regex = /<img(.*?)>/ig;
        var svgData = $('.mindmap-svg')[0].outerHTML;
        svgData = svgData.replace(regex, "<img$1></img>");
        var svgBlob = new Blob([svgData], {type:"application/xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "ConceptMap.xml";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    handleBackButton() {
        let graphBox = document.querySelector('.graph-box');
        fade.out(graphBox, 200, () => {
            this.props.resetGraphUI();
            this.props.showMainSearchBox();
        });
    }

    render() {
        return (
        <div className='well well-lg graph-box' id="GraphBox" style={{ opacity: this.state.opacity }}>
            {!this.props.graphUI.backButton ? "" :
                <div className="graph-back-button" onClick={this.handleBackButton}>
                    <i className="material-icons md-dark md-48"> arrow_back </i>
                    <span style={{ fontSize: '14px', marginLeft: '5px' }}> Back </span>
                </div>
            }
            <GraphTitle title={this.props.graphUI.titleText ? [this.props.meta.title, ' Concept Map'] : ['Loading...', '']}/>
            {!this.props.graphUI.toolsPane ? "" :
                <GraphToolPane
                    downloadSource={this.downloadSource}
                    toggleGraphMoveable={this.toggleGraphMoveable}
                    rerenderGraph={this.rerenderGraph}
                />
            }
            <div className = 'loader' style = {{ display: this.state.isLoading ? 'block' : 'none' }}></div>
            <GraphRoot />
        </div>
        );
    }
}

class GraphTitle extends React.Component {
    render() {
        return (
            <h2> <b>{this.props.title[0]}</b> {this.props.title[1]} </h2>
        );
    }
}

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

const mapStateToProps = (state) => {
    return ({
        display: state.UI.mainGraphBox,
        status: state.graphModel.status,
        meta: state.graphModel.meta,
        nodes: state.graphModel.nodes.all,
        connections: state.graphModel.connections,
        graphUI: state.graphUI,
    });
};

const mapDispatchToProps = (dispatch) => ({
    clearGraphModel: () => dispatch({
        type: 'CLEAR_GRAPH_MODEL'
    }),
    showToolsAndTitle: () => dispatch({
        type: 'GRAPH_GEN_COMPLETE'
    }),
    showMainSearchBox: () => dispatch({
        type: 'SHOW_ELEMENT',
        element: 'mainSearchBox'
    }),
    resetGraphUI: () => dispatch({
        type: 'RESET_GRAPH_UI'
    }),
});

const MainGraphBox = connect(mapStateToProps, mapDispatchToProps)(GraphBox);

export default MainGraphBox;
