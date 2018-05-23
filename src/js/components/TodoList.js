import React, { Component } from 'react';
import Todo from './todo';

class TodoList extends Component {
    render() {
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
}

export default TodoList;