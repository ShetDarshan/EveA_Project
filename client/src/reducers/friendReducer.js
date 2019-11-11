import { SEND_REQ } from '../actions/types';
const initialState = {
    friend: [],
    loading: false
};

export default function(state = initialState,action) {
    
    switch(action.type){
        case SEND_REQ:
            return {
                ...state,
                friend: action.payload,
                loading:false
     };
        default: 
            return state;

    }

}