import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validations/is-empty';
const initialState = {
    isAuthenticated: false,
    signUp: false,
    user: {}
};

export default function(state = initialState,action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                signUp: false
            };
        default: 
            return state;

    }

}