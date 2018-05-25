import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class AlertMessage extends Component {

    constructor(props) {
        super(props);

    }

    renderMessage = (message, error) => {
        let color = error ? 'danger' : 'success';
        return (
            <Alert className="api-alert" color={color}>
                {message}
            </Alert>
        );
    }
    render() {
        let { message, error } = this.props;

        return message ? this.renderMessage(message, error) : null;


    }
}

export default AlertMessage;