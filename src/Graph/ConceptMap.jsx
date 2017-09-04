import React from 'react';
import MindMap from 'react-mindmap';

import './ConceptMap.css';

class ConceptMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
    }
    render() {
        return (
          <MindMap
            id="concept-map"
            editable={this.state.editable}
            nodes={this.props.nodes}
            connections={this.props.connections}
            />
        );
    }
}

export default ConceptMap;
