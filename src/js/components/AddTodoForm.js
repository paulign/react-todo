import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, Button } from 'reactstrap';


class AddTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            completed: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (close) => {
        let { text, completed } = this.state;

        if (text) {
            let { addTodo } = this.props;
            let todo = {
                text: text,
                completed: completed,
                created: new Date(Date.now())
            };
            addTodo(todo);
            this.setState({
                text: '',
                completed: false
            });

            if(close) {
                this.props.history.push('/');
            }
        }

    }

    onChangeInput = (input, value) => {
        let state = {};
        state[input] = value;
        this.setState(state);
    }

    render() {
        let { text, completed } = this.state;

        return (
            <div className="row justify-content-center py-3">
                <div className="col-md-8">
                    <Form>
                        <FormGroup>
                            <Input type={'textarea'} placeholder={'Type Text'} value={text} onChange={(e) => this.onChangeInput('text', e.target.value)} />
                        </FormGroup>
                        <FormGroup check className="mb-3">
                            <Label check>
                                <Input type="checkbox" checked={completed} onChange={(e) => this.onChangeInput('completed', e.target.checked)} />{' '}
                                Completed
                            </Label>
                        </FormGroup>
                        <Button color="primary" onClick={() => this.handleSubmit(false)} className="mr-3" type="button">Add</Button>
                        <Button color="primary" onClick={() => this.handleSubmit(true)} className="mr-3" type="button">Add and Close</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddTodoForm;