import { GET_USERS,GET_USER } from '../actions/types';
const initialState = {
    profiles: [],
    profile:[],
    loading: false
};

export default function(state = initialState,action) {
    
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                profiles: action.payload,
                loading:false
      };
        case GET_USER:
            return {
                ...state,
                profile: action.payload,
                loading:false
      };
        default: 
            return state;

    }

}