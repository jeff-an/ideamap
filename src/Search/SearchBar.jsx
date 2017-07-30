import React from 'react';
import './SearchBar.css';
import { Button } from 'react-bootstrap';

class SearchBar extends React.Component {
    render() {
        return (
            <div className = {this.props.group + ' clear-fix'}>
                <form className = {this.props.group + "-form"}>
                    <SearchBarInput group = {this.props.group}/>
                </form>
                <SearchBarButton group = {this.props.group}/>
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
            <div className = {this.props.group + '-bar' + ' form-group'}>
                <span className = "fa fa-search fa-lg"></span>
                <input
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
            <div className = {this.props.group + '-submit'}>
                <Button className = "btn btn-primary" type = "submit">
                Generate
                </Button>
            </div>
        );
    }
}

export { SearchBar as default, SearchBarInput as InputBar, SearchBarButton as SubmitButton };
