import React from 'react';
import ReactTransitions from 'react-transitions';
import ReactDOM from 'react-dom';

import GraphTool from './GraphTool.jsx';
import './GraphTools.css';

const allTools = ['downloadGraph'];
const toolToIconMap = {
    downloadGraph: 'get_app',
};
const hoverTextMap = {
    downloadGraph: 'Export SVG Source',
};

class GraphToolPane extends React.Component {
    constructor(props) {
        super(props);
        this.allTools = allTools;
        this.toolToIcon = toolToIconMap;
        this.hoverTextMap = hoverTextMap;
    }

    render() {
        return (
            <ReactTransitions
                style = {{
                    zIndex: 500,
                    position: 'absolute',
                    top: 'calc(12% + 50px)',
                    left: 'calc(5% + 25px)',
                }}
                transition="rotate-out-newspaper-rotate-in-newspaper"
                width={100}
                height={400}
            >
                <div key={"graph-tools-pane"} className='graph-tools-pane'>

                    {this.allTools.map(tool => (
                        <span key={tool+'-span'} style={{
                            width: 40,
                            height: 400,
                        }}>
                        <GraphTool
                        key={tool}
                        hoverText={this.hoverTextMap[tool]}
                        icon={this.toolToIcon[tool]}
                        callback={this.props[tool]}
                        />
                        </span>
                    ))}

                </div>
            </ReactTransitions>
        );
    }
}

export default GraphToolPane;
