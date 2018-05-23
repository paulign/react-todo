import fetch from 'isomorphic-fetch';
import { apiRequest } from '../services/http-service';

export const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';

export const getAllTodos = () => {
  return {
    type: GET_TODOS_REQUEST
  }
}

export const addTodo = (todo) => {
  return {
    type: ADD_TODO_REQUEST,
    todo
  }
}

export const updateTodo = (todo) => {
  return {
    type: UPDATE_TODO_REQUEST,
    todo
  }
}

export const deleteTodo = (todo) => {
  return {
    type: DELETE_TODO_REQUEST,
    todo
  }
}

export const receiveTodos = (todos) => {
  return {
    type: RECEIVE_TODOS,
    todos
  }
}

export const receiveError = (errorMessage) => {
  return {
    type: RECEIVE_ERROR,
    errorMessage
  }
}

export const getAllTodosRequest = () => {
  return async (dispatch) => {
    try {
      dispatch(getAllTodos());
      let data = await apiRequest('todos');
      console.log(data);
      return dispatch(receiveTodos(data));

    } catch (error) {
      console.log(error.message);
      return dispatch(receiveError(error.message));
    }
  }
}

export const addTodoRequest = (todo) => {
  return async (dispatch, getState) => {
    try {
      console.log(todo);
      dispatch(addTodo(todo));
      let body = JSON.stringify(todo);
      console.log(body);
      let data = await apiRequest('todos', 'POST', body);
      console.log(data);
      let { todos } = getState();
      todos.items.push(data);
      return dispatch(receiveTodos(todos.items));

    } catch (error) {
      return dispatch(receiveError(error.message));
    }
  }
}

export const updateTodoRequest = (todo) => {
  return async (dispatch, getState) => {
    try {
      console.log(todo);
      dispatch(updateTodo(todo));
      let body = JSON.stringify(todo);
      console.log(body);
      let data = await apiRequest('todos/' + todo.id, 'PUT', body);
      console.log(data);
      let { todos } = getState();
      let index = todos.items.findIndex((item) => item.id == data.id);

      todos.items[index] = data;
      return dispatch(receiveTodos(todos.items));

    } catch (error) {
      return dispatch(receiveError(error.message));
    }
  }
}

export const deleteTodoRequest = (todo) => {
  return async (dispatch, getState) => {
    try {
      console.log(todo);
      dispatch(deleteTodo(todo));
      let body = JSON.stringify(todo);
      console.log(body);
      let data = await apiRequest('todos/' + todo.id, 'DELETE', body);
      console.log(data);
      let { todos } = getState();
      let index = todos.items.findIndex((item) => item.id == todo.id);

      todos.items.splice(index, 1);
      return dispatch(receiveTodos(todos.items));

    } catch (error) {
      return dispatch(receiveError(error.message));
    }
  }
}
