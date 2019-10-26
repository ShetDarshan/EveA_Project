import axios from 'axios';
import { GET_EVENTS,LOADING_DATA,GET_LEARNING } from './types';
export const getEvents = () => dispatch => {
  console.log("coming here")
    // dispatch({ type: LOADING_DATA });
    axios
      .get('http://localhost:5000/api/v1/events') 
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

  export const getLearning = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('http://localhost:5000/api/v1/learning') 
      .then(res => 
        dispatch({
          type: GET_LEARNING,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_LEARNING,
          payload: null
        })
      );
  };
