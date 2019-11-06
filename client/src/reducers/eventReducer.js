import { GET_EVENTS,GET_LEARNING,GET_EVENT_DETAILS,GET_RCMD_DETAILS } from '../actions/types';
const initialState = {
    events: [],
    learning: [],
    eventDetails: [],
    recom: [],
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
      case GET_RCMD_DETAILS:
            
          return {
              ...state,
              recom: action.payload,
              loading: false
          }
        default: 
            return state;

    }

}