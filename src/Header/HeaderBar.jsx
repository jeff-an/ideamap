import React from 'react';
import { connect } from 'react-redux';

import logo from '../Misc/img/logo.svg';
import './HeaderBar.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.showMainSearchBox();
        this.props.resetGraphUI();
    }
    render() {
        return (
            <div className="app-header-bar">
                <div className="title-logo-container" onClick={this.onClick}>
                    <img src={logo} className="app-logo" alt="logo" />
                    <div className="app-title">
                        <p style={{margin:0}}>IdeaMap</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    showMainSearchBox: () => dispatch({
        type: 'SHOW_ELEMENT',
        element: 'mainSearchBox'
    }),
    resetGraphUI: () => dispatch({
        type: 'RESET_GRAPH_UI'
    }),
});

const HeaderBar = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderBar;
