import React, { Component } from 'react';
import { Input } from 'reactstrap';


class AddTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { text } = this.state;

        if (text) {
            let { addTodo } = this.props;
            let todo = {
                text: text,
                completed: false,
                created: new Date(Date.now())
            };
            addTodo(todo);
            this.setState({
                text: ''
            });
        }

    }

    onChangeInput = (input, value) => {
        let state = {};
        state[input] = value;
        this.setState(state);
    }

    render() {
        let {text} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <Input type={'textarea'} placeholder={'Type Text'} value={text} onChange={(e) => this.onChangeInput('text', e.target.value)} />
                </div>
                <button className="btn btn-primary" type="submit">Add Todo</button>
            </form>
        );
    }
}

export default AddTodoForm;