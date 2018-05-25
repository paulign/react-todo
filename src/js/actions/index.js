import fetch from 'isomorphic-fetch';
import { apiRequest } from '../services/http-service';

export const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const SHOW_SUCCEESS_ALERT = 'SHOW_SUCCEESS_ALERT';
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

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
      dispatch(addTodo(todo));
      let body = JSON.stringify(todo);
      let data = await apiRequest('todos', 'POST', body);
      let { todos } = getState();
      todos.items.push(data);
      dispatch(showAlertWithTimeout('Todo was successfully added!'));
      return dispatch(receiveTodos(todos.items));

    } catch (error) {
      dispatch(showAlertWithTimeout(error.message, true));
      return dispatch(receiveError(error.message));
    }
  }
}

export const updateTodoRequest = (todo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateTodo(todo));
      let body = JSON.stringify(todo);
      let data = await apiRequest('todos/' + todo.id, 'PUT', body);
      let { todos } = getState();
      let index = todos.items.findIndex((item) => item.id == data.id);

      todos.items[index] = data;
      dispatch(showAlertWithTimeout('Todo was successfully updated!'));
      return dispatch(receiveTodos(todos.items));

    } catch (error) {
      dispatch(showAlertWithTimeout(error.message, true));
      return dispatch(receiveError(error.message));
    }
  }
}

export const deleteTodoRequest = (todo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteTodo(todo));
      let body = JSON.stringify(todo);
      let data = await apiRequest('todos/' + todo.id, 'DELETE', body);
      let { todos } = getState();
      let index = todos.items.findIndex((item) => item.id == todo.id);

      todos.items.splice(index, 1);
      dispatch(showAlertWithTimeout('Todo was successfully deleted!'));
      return dispatch(receiveTodos(todos.items));

    } catch (error) {
      dispatch(showAlertWithTimeout(error.message, true));
      return dispatch(receiveError(error.message));
    }
  }
}

let alertID = 0;
export const showAlert = (message, id, error = false) => {
  return {
    type: error ? SHOW_ERROR_ALERT : SHOW_SUCCEESS_ALERT,
    message,
    id,
    error
  }
}

export const showAlertWithTimeout = (message, error) => {
  return async (dispatch, getState) => {
    try {
      let nextAlertId = alertID++;
      
      dispatch(showAlert(message, nextAlertId, error));
      let timeout = () => {
        if (getState().alert.message && getState().alert.id == nextAlertId) {
          return dispatch(hideAlert());
        }
        else {
          clearTimeout(timeout);
        }
      }
      setTimeout(timeout, 5000);

    } catch (error) {
      console.log(error);
    }
  }
}

export const hideAlert = () => {
  return {
    type: HIDE_ALERT
  }
}
