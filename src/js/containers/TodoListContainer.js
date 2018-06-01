import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { getAllTodosRequest, updateTodoRequest, deleteTodoRequest, showAlertWithTimeout, hideAlert } from '../actions';

class TodoListContainer extends Component {

    componentDidMount = () => {
        document.title = 'Todolist';
    }

    render() {
        return (
            <TodoList {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        alert: state.alert
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTodos: () => dispatch(getAllTodosRequest()),
        updateTodo: (todo) => dispatch(updateTodoRequest(todo)),
        deleteTodo: (todo) => dispatch(deleteTodoRequest(todo)),
        showAlert: (message, error) => dispatch(showAlertWithTimeout(message, error)),
        hideAlert: () => dispatch(hideAlert())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListContainer);