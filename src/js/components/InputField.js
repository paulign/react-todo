import React, { Component } from 'react';

class InputField extends Component {
    constructor(props) {
        super(props);

        let { validateFn } = props;

        this.state = {
            value: "",
            valid: this.isValid(props.value)
        };

        this.onChange = this.onChange.bind(this);
    }

    isValid = (value) => {
        let { validateFn } = this.props;
        return validateFn ? validateFn(value) : true;
    }

    onChange(e) {
        var val = e.target.value;
        var isValid = this.isValid(val);
        this.setState({
            value: val,
            valid: isValid
        });
    }

    render() {
        let { value } = this.state;
        let { placeholder, onBlur } = this.props;

        return (
            <input type="text"
                className="form-control"
                value={value}
                onChange={this.onChange}
                placeholder={placeholder}
                onBlur={onBlur}
                ref={(input) => { this.input = input; }} />
        );
    }
}

export default InputField;