import React from 'react';
import fade from 'fade';
import $ from 'jquery';
import {Grid, Row, Col} from 'react-bootstrap';

import './HowItWorks.css';

const apostrophe = String.fromCharCode(39);

class HowItWorksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionTop: '5%',
            opacity: 0
        };
    }

    componentDidMount() {
        setTimeout(() => {
            $('#hiw-content-container').animate({
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
            <Grid>
            <div className="hiw-root">
            <Col xs={11} style= {{ marginLeft: '5%'}}>
                <div style= {{ position: 'absolute', top: this.state.positionTop, opacity: this.state.opacity }}
                    id="hiw-content-container"
                    className="hiw-content container"
                >

                    {/** Static fixed title at the top **/}
                    <div className="hiw-title header-text">
                        <b>How</b> IdeaMap Works
                    </div>
                    <hr className="faded"/>

                    <div className="body-text" style={{ maxWidth: '91.66666667%' }}>
                        <p>
                            IdeaMap relies upon the Wikipedia API as its primary information source.
                            When the user enters a particular topic, various statistical and heuristics methods
                            are used to compute the most important (and therefore related) concepts in the corresponding article.
                            The algorithm is then recursively applied in a pattern similar to <a href="http://en.wikipedia.org/wiki/Breadth-first_search">breadth-first-search</a>, ultimately resulting in the complete mindmap.
                        </p>
                    </div>

                    <HowItWorksBody/>
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

class StatisticsBodyText extends React.Component {
    render() {
        return (
            <span>
                <p>
                    The central statistical method used to compute "related" concepts is called <a href="http://en.wikipedia.org/wiki/Tf%E2%80%93idf">"term-frequency inverse-document frequency"</a> (tf-idf).
                    IdeaMap uses a modified version of this algorithm to balance how often a term appears in a document against its overall frequency in the English language.
                    Each term in the Wikipedia article related to the user{apostrophe}s chosen topic is assigned a relevancy score with this algorithm.
                    Finally, terms within a certain standard deviation away from the mean are passed to the graph generation algorithm.
                </p>
            </span>
        );
    }
}

class HeuristicsBodyText extends React.Component {
    render() {
        return (
            <span>
                <p>
                    Heuristics also play an important role in the process of collecting term "candidates" from crawled Wikipedia pages. Namely, extra rules are applied such that recursive loops (cycles) are not
                    generated as part of the breadth-first-search process. This rule is implemented by a similarity comparsion between the Wikipedioa article being crawled and the candidate terms{apostrophe} articles.
                    Other heuristic rules play a part in preventing sources and references from being considered as important terms.
                </p>
                <p>
                    If you would like to know more about the underlying algorithms behind IdeaMap, feel free to ask a question via the Contact Us feature.
                </p>
            </span>
        );
    }
}

class HowItWorksBody extends React.Component {
    render() {
        return (
            <Grid style={{ padding: 0, marginBottom: '50px'}}>
                {/** Scrollspy dynamic sections **/}
                <Col xs={11} style={{padding: 0}}>
                    <h2 className="header-text" style={{ fontSize: '3.5vh' }}> Statistical Basis </h2>
                    <section className="well well-lg" id="hiw-statistics">
                        <Row className="show-grid">
                                <div className="body-text">
                                    <StatisticsBodyText/>
                                </div>
                        </Row>
                    </section>
                </Col>

                <Col xs={11} style={{padding: 0, marginBottom: '50px'}}>
                    <h2 className="header-text" style={{ fontSize: '3.5vh' }}> Heuristics </h2>
                    <section className="well well-lg" id="hiw-heuristics">
                        <Row className="show-grid">
                                <div className="body-text">
                                    <HeuristicsBodyText/>
                                </div>
                        </Row>
                    </section>
                </Col>
            </Grid>
        );
    }
}

export default HowItWorksPage;
