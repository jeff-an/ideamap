import React from 'react';
import './SearchBar.css';
import { Button } from 'react-bootstrap';

class SearchBar extends React.Component {
    render() {
        return (
            <div className = "main-search clear-fix">
                <form id = {this.props.name} className = "main-search-form">
                    <SearchBarInput
                        name = "SearchBarInput"
                        classes = "main-search-bar form-group"/>
                </form>
                <SearchBarButton name = "search-submit"/>
            </div>
        );
    }
}

class SearchBarInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: true,
            placeholder: "Enter a concept..."
        };
    }
    render() {
        return (
            <div className = {this.props.classes} >
                <span className = "fa fa-search"></span>
                <input
                    id = {this.props.name}
                    type = "search"
                    className = "form-control"
                    autoCapitalize = "words"
                    maxLength = "30"
                    placeholder = {this.state.placeholder}
                    autoComplete = "off" />
            </div>
        );
    }
}

class SearchBarButton extends React.Component {
    render() {
        return (
            <div className = {this.props.name}>
                <Button id = {this.props.name + '-button'} className = "btn btn-default" type = "submit">
                <p className = {this.props.name + '-text'}> Submit </p>
                </Button>
            </div>
        );
    }
}

export { SearchBar as default, SearchBarInput as InputBar, SearchBarButton as SubmitButton };
