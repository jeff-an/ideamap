import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import './NavBar.css';

const Pages = ['AboutPage', 'HowItWorksPage'];
const canonicalPages = {
    AboutPage: 'About IdeaMap',
    HowItWorksPage: 'How It Works'
};

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.pages = Pages;
        this.canonicalPages = canonicalPages;
    }
    openEmailDialog(key, e) {
        e.preventDefault();
        window.location.href = "mailto:uwjeffan@outlook.com";
    }
    render() {
        return (
            <Navbar inverse collapseOnSelect fluid fixedTop className="nav-root">
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        { this.pages.map(page => (
                            <NavItem key = {page} eventKey={page} onSelect={this.props.showPage}>
                                <p key={page + "Text"} className="nav-button-text">
                                    {this.canonicalPages[page]}
                                </p>
                            </NavItem>
                        ))}
                    </Nav>
                    <Nav pullRight className="nav-right">
                        <NavItem eventKey={'contactUs'} onSelect={this.openEmailDialog}>
                            <p className="nav-button-text">
                                Contact Us
                            </p>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    showPage: (eventKey, e) => {
        e.preventDefault();
        dispatch({
            type: 'SHOW_PAGE',
            pageName: eventKey,
        });
    },
});


const NavBarInstance = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarInstance;
