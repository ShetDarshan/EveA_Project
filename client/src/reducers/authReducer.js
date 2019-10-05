import { SET_CURRENT_USER,GET_EVENTS, } from '../actions/types';
import isEmpty from '../validations/is-empty';
const initialState = {
    events: [],
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state = initialState,action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
            case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading:false
      };
        default: 
            return state;

    }

}