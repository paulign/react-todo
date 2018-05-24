import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {

    constructor(props) {
        super(props);

    }

    renderNoItems = () => {
        let {todos} = this.props;
        let text = todos.isFetching ? 'Loading...' : 'No items yet...';
        return (
            <h4 className="text-center">{text}</h4>
        );
    }

    renderTodos = () => {
        let { todos, updateTodo, deleteTodo } = this.props;

        console.log(todos.items);

        return (
            <ul>
                {todos ? todos.items.map(todo =>
                    <Todo
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ) : null}
            </ul>
        );
    }

    render() {
        let { todos } = this.props;

        console.log(todos);
        return todos && todos.items.length ? this.renderTodos() : this.renderNoItems();
        
    }
}

export default TodoList;