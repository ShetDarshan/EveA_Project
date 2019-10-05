import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import eventReducer from './errorReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    events: eventReducer
}); 