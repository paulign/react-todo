import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import Loading from '../components/Loading';
import { getAllTodosRequest, updateTodoRequest, deleteTodoRequest  } from '../actions';

class TodoListContainer extends Component {
    
    componentDidMount () {
        this.props.getAllTodos();
    }

    render() {
        let { todos } = this.props;

        return (
            <div>
                <TodoList {...this.props} />
                <Loading isLoading={todos.isFetching}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTodos: () => dispatch(getAllTodosRequest ()),
        updateTodo: (todo) => dispatch(updateTodoRequest (todo)),
        deleteTodo: (todo) => dispatch(deleteTodoRequest (todo)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListContainer);