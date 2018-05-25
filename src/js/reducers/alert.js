import {SHOW_SUCCEESS_ALERT, SHOW_ERROR_ALERT, HIDE_ALERT} from '../actions';

const alert = (state = { message: null, error: false }, action) => {
    switch (action.type) {
        case SHOW_SUCCEESS_ALERT:
        case SHOW_ERROR_ALERT:
            return { ...state, ...{ message: action.message, error: action.error } };
        case HIDE_ALERT:
            return { ...state, ...{ message: null, error: false } }
        default:
            return state
    }
}

export default alert;