import { GET_EVENTS } from '../actions/types';
const initialState = {
    events: [],
    loading: false
};

export default function(state = initialState,action) {
    console.log("in reducer",action.payload);
    switch(action.type){
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