import React from 'react';

class BackgroundBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lengthStyle: props.length,
            widthStyle: props.width
        };
    }

}
