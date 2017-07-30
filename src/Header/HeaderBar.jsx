import React from 'react';
import logo from '../Misc/img/logo.svg';
import './HeaderBar.css';

class HeaderBar extends React.Component {
    render() {
        return (
            <div className="app-header-bar">
                <div className="title-logo-container">
                    <img src={logo} className="app-logo" alt="logo" />
                    <div className="app-title">
                        <p style={{margin:0}}>IdeaMap</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderBar;
