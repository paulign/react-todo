import { GET_TODOS_REQUEST, RECEIVE_TODOS, RECEIVE_ERROR, ADD_TODO_REQUEST, UPDATE_TODO_REQUEST, DELETE_TODO_REQUEST } from '../actions';

const todos = (state = { isFetching: false, error: null, items: [] }, action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
        case ADD_TODO_REQUEST:
        case UPDATE_TODO_REQUEST:
        case DELETE_TODO_REQUEST:
            return { ...state, ...{ isFetching: true, error: null } };
        case RECEIVE_TODOS:
            return { ...state, ...{ isFetching: false, error: null, items: action.todos } }
        case RECEIVE_ERROR:
            return { ...state, ...{ isFetching: false, error: action.errorMessage } }
        default:
            return state
    }
}

export default todos;