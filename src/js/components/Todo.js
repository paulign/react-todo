import React, { Component } from 'react';
import { Input } from 'reactstrap';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editText: props.todo.text,
            editMode: false
        }
        this.toggleComplete = this.toggleComplete.bind(this);
        this.delete = this.delete.bind(this);
    }

    toggleComplete = (e) => {
        e.preventDefault();
        let { updateTodo, todo } = this.props;
        let newTodo = { ...todo, ...{ completed: !todo.completed } }
        updateTodo(newTodo);
    }

    updateText = () => {
        let { updateTodo, todo } = this.props;
        let { editText } = this.state;
        if (editText && editText != todo.text) {
            let newTodo = { ...todo, ...{ text: editText } };
            updateTodo(newTodo);
        }
        this.toggleEditMode(false);

    }

    delete = (e) => {
        e.preventDefault();
        let { deleteTodo, todo } = this.props;
        deleteTodo(todo);
    }

    toggleEditMode = async (mode, e) => {
        if (e) {
            e.preventDefault();
        }

        await this.setState({
            editMode: mode
        });
        if (mode) {
            this.editTextInput.focus();
        }
    }

    onChangeInput = (input, value) => {
        let state = {};
        state[input] = value;
        this.setState(state);
    }

    renderInput = () => {
        let { editText } = this.state;

        return (
            <Input
                onChange={(e) => this.onChangeInput('editText', e.target.value)}
                value={editText}
                innerRef={(input) => (this.editTextInput = input)}
                onBlur={() => this.updateText()} />
        );
    }

    renderText = (text) => {
        return (
            <p className="mb-0 todo-text">
                {text}
            </p>
        );
    }

    render() {
        let { text, completed, created } = this.props.todo;
        let { editMode } = this.state;
        let toggleIconClass = completed ? 'fas' : 'far';
        let completedClass = completed ? 'completed' : '';
        let toggleClass = completed ? 'text-success' : 'text-warning';
        return (
            <li className={`list-unstyled d-flex mb-3 todo-item ${completedClass}`}>
                <a href="" className={`${toggleClass}`} onClick={this.toggleComplete}>
                    <i className={`${toggleIconClass} fa-check-circle mr-3 fa-2x`} />
                </a>
                <div>
                    {editMode ? this.renderInput() : this.renderText(text)}
                    <small className="text-muted">
                        created at: {new Date(created).toLocaleString()}
                    </small>
                </div>
                <div className="todo-actions">
                {completed ? null :
                    <a href="" className="mr-2 text-dark" onClick={(e) => this.toggleEditMode(true, e)}>
                        <i className="fas fa-pencil-alt"></i>
                    </a>
                }
                    <a href="" className="text-dark" onClick={this.delete}>
                        <i className="fas fa-trash"></i>
                    </a>
                </div>
            </li>
        );
    }
}

export default Todo;