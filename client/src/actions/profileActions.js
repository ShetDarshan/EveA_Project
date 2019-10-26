import axios from 'axios';
import { GET_EVENTS,LOADING_DATA,GET_LEARNING } from './types';

export const getAllProfiles = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('/api/v1/users') 
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