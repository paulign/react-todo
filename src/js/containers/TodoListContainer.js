import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import { getAllTodosRequest, updateTodoRequest, deleteTodoRequest, showAlertWithTimeout  } from '../actions';

class TodoListContainer extends Component {
    
    componentDidMount () {
        this.props.getAllTodos();
    }

    render() {
        let { todos, alert } = this.props;

        return (
            <div>
                <AlertMessage {...alert} />
                <TodoList {...this.props} />
                <Loading isLoading={todos.isFetching}/>
            </div>
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
        getAllTodos: () => dispatch(getAllTodosRequest ()),
        updateTodo: (todo) => dispatch(updateTodoRequest (todo)),
        deleteTodo: (todo) => dispatch(deleteTodoRequest (todo)),
        showAlert: (message, error) => dispatch(showAlertWithTimeout (message, error))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListContainer);