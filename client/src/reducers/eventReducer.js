import { GET_EVENTS,GET_LEARNING,GET_EVENT_DETAILS } from '../actions/types';
const initialState = {
    events: [],
    learning: [],
    eventDetails: [],
    loading: false
};

export default function(state = initialState,action) {
    
    switch(action.type){

        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading:false
      };
      case GET_EVENT_DETAILS:
        return {
            ...state,
            eventDetails: action.payload,
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