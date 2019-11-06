import axios from 'axios';
import { GET_USERS,GET_USER,UPDATE_USER } from './types';

export const getAllProfiles = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('http://localhost:5001/evea-prj/us-central1/api/api/v1/getAllProfiles') 
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

  export const getProfile = (email) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get(`http://localhost:5001/evea-prj/us-central1/api/api/v1/getProfile/${email}`) 
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

  export const updateProfile = (userDetails) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    console.log("updateprofile:",userDetails)
    axios
      .post('http://localhost:5001/evea-prj/us-central1/api/api/v1/updateProfile',userDetails) 
      .then(res => 
        dispatch({
          type: UPDATE_USER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: UPDATE_USER,
          payload: null
        })
      );

  };