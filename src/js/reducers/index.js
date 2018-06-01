import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todos from './todos';
import alert from './alert';

const rootReducer = combineReducers({
    todos,
    alert,
    router: routerReducer
});

export default rootReducer;