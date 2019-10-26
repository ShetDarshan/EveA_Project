import axios from 'axios';
import { GET_USERS,GET_USER } from './types';

export const getAllProfiles = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('http://localhost:5000/api/v1/getAllProfiles') 
      .then(res => 
        dispatch({
          type: GET_USERS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_USERS,
          payload: null
        })
      );
  };

  export const getProfile = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('http://localhost:5000/api/v1/getProfile') 
      .then(res => 
        dispatch({
          type: GET_USER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_USER,
          payload: null
        })
      );
  };