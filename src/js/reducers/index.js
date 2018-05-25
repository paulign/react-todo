import { combineReducers } from 'redux';
import todos from './todos';
import alert from './alert';

const rootReducer = combineReducers({
    todos,
    alert
});

export default rootReducer;