import React from 'react';
import ReactTooltip from 'react-tooltip';

import './GraphTools.css';

class GraphTool extends React.Component {
    render() {
        return (
            <div className="graph-tool well well-md" data-place="right" onClick={this.props.callback} data-tip={this.props.hoverText}>
                <i className="material-icons md-24 md-light graph-icon"> {this.props.icon} </i>
                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}

export default GraphTool;
