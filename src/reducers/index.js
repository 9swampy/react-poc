import { combineReducers } from 'redux';
import authReducer from './auth';
import counterReducer from './counter';
import weatherForecastReducer from './weatherForecast';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    weatherForecast : weatherForecastReducer,
})

export default rootReducer;
