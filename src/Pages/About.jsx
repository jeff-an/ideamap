import React from 'react';
import fade from 'fade';
import $ from 'jquery';
import Scrollspy from 'react-scrollspy';
import {Grid, Row, Col} from 'react-bootstrap';

import exampleImg from '../Misc/img/example.PNG';
import creatorImg from '../Misc/img/creator.jpg';
import './About.css';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="about-root">
                <div className="about-content container">

                    {/** Static fixed title at the top **/}
                    <div className="about-title header-text">
                        About IdeaMap
                    </div>
                    <hr className="faded"/>

                    <AboutBody/>

                </div>
            </div>
        );
    }
}

class AboutBody extends React.Component {
    render() {
        return (
            <Grid>
                {/** Scrollspy dynamic sections **/}
                <section id="about-app">
                    <Row className="show-grid">
                        <Col xsHidden md={3}>
                            <div className="image-outer">
                                <img src={exampleImg} width="100%" height="100%"/>
                            </div>
                        </Col>
                        <Col xs={12} md={9}>
                            <div className="body-text" style={{ textAlign: 'left', marginTop: "10px" }}>
                                Hello
                            </div>
                        </Col>
                    </Row>
                </section>
                <section id="about-creator">
                    <Row className="show-grid">
                        <Col xsHidden md={3}>
                            <div className="image-outer">
                                <img src={creatorImg} width="100%" height="100%"/>
                            </div>
                        </Col>
                        <Col xs={12} md={9}>
                            <div className="body-text" style={{ textAlign: 'left', marginTop: "10px" }}>
                                Hello
                            </div>
                        </Col>
                    </Row>
                </section>
            </Grid>
        );
    }
}

export default AboutPage;
