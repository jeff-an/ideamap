import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const Pages = ['aboutPage', 'howItWorksPage'];
const canonicalPages = {
    aboutPage: 'About IdeaMap',
    howItWorksPage: 'How It Works'
};

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.pages = Pages;
        this.canonicalPages = canonicalPages;
    }
    openEmailDialog(key, e) {
        e.preventDefault();
        window.open("mailto:uwjeffan@gmail.com");
    }
    render() {
        return (
            <Navbar inverse collapseOnSelectfluid fixedTop className="nav-root">
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        { this.pages.map(page => (
                            <NavItem eventKey={page} onSelect={this.props.showPage}>
                                <p className="nav-button-text">
                                    {this.canonicalPages[page]}
                                </p>
                            </NavItem>
                        ))}
                    </Nav>
                    <Nav pullRight>
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
            element: eventKey,
        });
    },
});


const NavBarInstance = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarInstance;