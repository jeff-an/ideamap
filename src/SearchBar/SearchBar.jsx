import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: true,
            classNames: "form-control search-text"
        };
    }
    render() {
      return (
        <div className = "search">
            <div className = "search-bar form-group">
                <span className = "fa fa-search"></span>
                <input
                    id = "SearchBarInput"
                    type = "search"
                    className = {this.state.classNames}
                    autoCapitalize = "words"
                    maxLength = "30"
                    placeholder = "Enter a concept..."
                    autoComplete = "off" />
            </div>
        </div>
      );
    }
}

export default SearchBar;
