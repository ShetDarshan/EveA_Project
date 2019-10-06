import axios from 'axios';
import { GET_EVENTS,LOADING_DATA } from './types';

export const getEvents = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('/api/v1/events') 
      .then(res => 
        dispatch({
          type: GET_EVENTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_EVENTS,
          payload: null
        })
      );
  };
