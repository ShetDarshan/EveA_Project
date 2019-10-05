import { GET_EVENTS } from '../actions/types';
const initialState = {
    events: null,
    loading: false
};

export default function(state = initialState,action) {
    switch(action.type){
        case GET_EVENTS:
            console.log("inside wevent case");
            return {
                ...state,
                events: action.payload,
                loading:false
      };
        default: 
            return state;

    }

}