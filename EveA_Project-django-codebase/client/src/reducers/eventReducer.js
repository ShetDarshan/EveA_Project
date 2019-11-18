import { GET_EVENTS,GET_LEARNING } from '../actions/types';
const initialState = {
    events: [],
    learning: [],
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
        case GET_LEARNING:
            return {
                ...state,
                learning: action.payload,
                loading:false
      };
        default: 
            return state;

    }

}