import React from 'react';
import ReactTransitions from 'react-transitions';
import ReactDOM from 'react-dom';

import GraphTool from './GraphTool.jsx';
import './GraphTools.css';

// Array containing names of all the tools
const allTools = ['edit', 'undo', 'bookmark', 'downloadSource'];

// Map from tool name to Google icon
const toolIconMapMap = {
    edit: 'mode_edit',
    downloadSource: 'code',
    bookmark: 'bookmark',
    undo: 'undo',
};

// Map from tool name to hover text
const hoverTextMap = {
    edit: 'Edit Concept Map',
    undo: 'Revert all changes',
    downloadSource: 'Export SVG Source',
    bookmark: "Coming soon",
};

const toolTwoWayMap = {
    edit: true,
    undo: false,
    downloadSource: false,
    bookmark: false,
};

class GraphToolPane extends React.Component {
    constructor(props) {
        super(props);
        this.allTools = allTools;
        this.toolIconMap = toolIconMapMap;
        this.hoverTextMap = hoverTextMap;
        this.toolTwoWayMap = toolTwoWayMap;
        this.toolCallbackMap = {
            edit: () => {
                this.props.toggleGraphMoveable(true);
            },
            downloadSource: this.props.downloadSource,
            bookmark: () => {
                return;
            },
            undo: () => {
                this.props.rerenderGraph();
            },
        };
        this.toolUndoCallbackMap = {
            edit: () => {
                this.props.toggleGraphMoveable(false);
            },
        };
    }

    render() {
        return (
            <ReactTransitions
                style = {{
                    zIndex: 500,
                    position: 'absolute',
                    top: '15%',
                    left: '6.5%',
                }}
                transition="rotate-out-newspaper-rotate-in-newspaper"
                width={100}
                height={400}
            >
                <div key={"graph-tools-pane"} className='graph-tools-pane'>

                    {this.allTools.map(tool => (
                        <span key={tool+'-span'}>
                        <GraphTool
                        key={tool}
                        hoverText={this.hoverTextMap[tool]}
                        icon={this.toolIconMap[tool]}
                        twoWay={this.toolTwoWayMap[tool]}
                        callback={this.toolCallbackMap[tool]}
                        undoCallback={this.toolUndoCallbackMap[tool]}
                        />
                        </span>
                    ))}

                </div>
            </ReactTransitions>
        );
    }
}

export default GraphToolPane;
