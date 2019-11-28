import { SEND_REQ,GET_REQ ,FRNDS_GOING } from '../actions/types';
const initialState = {
    friend: [],
    request: [],
    friendsGoing : [],
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
     case GET_REQ:
        return {
            ...state,
            request: action.payload,
            loading:false
 };
 case FRNDS_GOING:
    return {
        ...state,
        friendsGoing: action.payload,
        loading:false
};
        default: 
            return state;

    }

}