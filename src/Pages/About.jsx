import React from 'react';
import fade from 'fade';
import $ from 'jquery';
import {Grid, Row, Col} from 'react-bootstrap';

import exampleImg from '../Misc/img/example.PNG';
import creatorImg from '../Misc/img/creator.jpg';
import './About.css';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionTop: '5%',
            opacity: 0
        };
    }

    componentDidMount() {
        setTimeout(() => {
            $('#about-content-container').animate({
                top: 0,
                opacity: 1
            }, () => {
                this.setState({
                    positionTop: 0,
                    opacity: 1
                });
            });
        }, 100);
    }

    render() {
        return (
            <Grid fluid style={{ padding: 0 }}>
                <div className="about-root">
                    <Col xs={11} style={{ marginLeft: '20px'}}>
                        <div style= {{ position: 'absolute', top: this.state.positionTop, opacity: this.state.opacity }}
                            id="about-content-container"
                            className="about-content container"
                        >

                            {/** Static fixed title at the top **/}
                            <div className="about-title header-text">
                                <b>About</b> IdeaMap
                            </div>
                            <hr className="faded"/>

                            <AboutBody/>
                            {/** Abandoned scrollspy feature
                            <div className="scroll-spy">
                                <li><a href="#about-app">About the application</a></li>
                                <li><a href="#about-creator">About the creator</a></li>
                            </div>
                            **/}
                        </div>
                    </Col>
                </div>
            </Grid>
        );
    }
}

class AboutAppBodyText extends React.Component {
    render() {
        return (
            <span>
                <p>
                    IdeaMap is an <b>automatic, intelligent concept mapping tool</b>.
                    Its primary purpose is to help users discover and learn about related concepts in a particular topic or field of study.
                    For example, a Math major studying Linear Algebra might use this tool to learn about eigenvectors or affine spaces.
                    The resulting concept map for "Linear Algebra" could even be saved for future reference.
                </p>
                <p>
                    Another application of IdeaMap is summarization.
                    A history major studying World War 2, for example, might want to get a high-level overview of the Battle of Dieppe without having to comb through a entire textbook chapter.
                    Using IdeaMap, it can be easily be determined that the Luftwaffe, 101st Airborne Division, and the Allied Fusiliers played key roles in the battle.
                </p>
            </span>
        );
    }
}

class AboutCreatorBodyText extends React.Component {
    onClick(e) {
        if (e) {
            e.preventDefault();
        }
        window.location.href = "mailto:uwjeffan@outlook.com";
    }
    render() {
        return (
            <span>
                <p>
                    Hello! My name is Jeff An and I am the creator of IdeaMap. This site is one of my humble side-projects (and actually started out as just a test-ground for React.js).
                    Despite being developed in under a month end to end, I am quite satisfied with the simple usefulness of IdeaMap. In fact, this is one of my only side projects I
                    actually find myself using personally!
                </p>
                <p>
                    If you have any feedback for this site or would like to contribute, please contact me <a onClick={this.onClick}>here</a>. If you like what you see on this site and have
                    a need for something similar, I would very much welcome an email as well. For a more extensive list of qualifications and previous work experiences, I would encourage you to visit my
                    <a href="http://www.linkedin.com/in/jeff-an-a44b1a113/">LinkedIn</a>. Happy Concept-Mapping!
                </p>
            </span>
        );
    }
}

class AboutBody extends React.Component {
    render() {
        return (
            <Grid style={{ padding:0}}>
                {/** Scrollspy dynamic sections **/}

                <Col xs={11} lgPush={1} lg={12} style={{padding: 0}}>
                    <section className="well well-lg" id="about-app">
                        <Row className="show-grid">
                            <Col lgPush={2} xsHidden smHidden md={6} lg={1}>
                                <div className="image-outer">
                                    <img src={exampleImg} width="100%" height="100%"/>
                                </div>
                            </Col>
                            <Col xs={10} md={6} lg={7} lgPush={4}>
                                <div className="body-text">
                                    <AboutAppBodyText/>
                                </div>
                            </Col>
                        </Row>
                    </section>
                </Col>

                <Col xs={11} lgPush={1} lg={12} style={{padding: 0, marginBottom: '50px' }}>
                    <section className="well well-lg" id="about-creator">
                        <Row className="show-grid">
                            <Col lgPush={2} xsHidden smHidden md={6} lg={1}>
                                <div className="image-outer">
                                    <img src={creatorImg} width="100%" height="100%"/>
                                </div>
                            </Col>
                            <Col xs={10} md={6} lg={7} lgPush={4}>
                                <div className="body-text">
                                    <AboutCreatorBodyText/>
                                </div>
                            </Col>
                        </Row>
                    </section>
                </Col>
            </Grid>
        );
    }
}

export default AboutPage;
