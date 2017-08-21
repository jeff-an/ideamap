import React from 'react';
import MindMap from 'react-mindmap';
import { render } from 'react-dom';

import store from '../Store/CentralStore.js';

import './ConceptMap.css';

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

/*
function renderGraph(nodes, connections) {
    render (
        <ConceptMap nodes={store.getState().graphModel.nodes.all} connections={store.getState().graphModel.connections} />,
        document.getElementById('GraphBox')
    );
}*/

function renderGraph(nodes, connections) {
    render (
        <ConceptMap nodes={nodes} connections={connections} />,
        document.getElementById('GraphRoot')
    );
}

export { renderGraph as default, ConceptMap };
