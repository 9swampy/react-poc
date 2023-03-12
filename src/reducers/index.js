import { combineReducers } from 'redux';
import authReducer from './auth';
import counterReducer from './counter';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
})

export default rootReducer;
