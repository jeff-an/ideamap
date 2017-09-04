import React from 'react';
import ReactTooltip from 'react-tooltip';

import './GraphTools.css';

class GraphTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            opacity: 0.8,
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        if (!this.props.twoWay) {
            this.props.callback();
        } else {
            if (this.state.pressed) {
                this.setState({
                    pressed: false,
                    opacity: 0.8,
                }, () => {
                    this.props.undoCallback();
                });
                return;
            } else {
                this.setState({
                    opacity: 1,
                    pressed: true,
                }, () => {
                    this.props.callback();
                });
            }
        }
    }
    render() {
        return (
            <div className="graph-tool well well-md" data-place="right" onClick={this.onClick} data-tip={this.props.hoverText}>
                <i style={{ opacity: this.state.opacity}} className="material-icons md-24 md-light graph-icon"> {this.props.icon} </i>
                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}

export default GraphTool;
