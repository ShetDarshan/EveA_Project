import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import eventReducer from './eventReducer';
import profileReducer from './profileReducer';
import friendReducer from './friendReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    events: eventReducer,
    users: profileReducer,
    friends: friendReducer
}); 