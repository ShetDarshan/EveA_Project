import axios from 'axios';
import { SEND_REQ } from './types';

export const sendFriendRequest = (friend) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    console.log("frienReq:",friend);
    axios
      .post('http://localhost:5000/api/v1/sendFriendRequest',friend)   
      .then(res => 
        dispatch({
          type: SEND_REQ,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: SEND_REQ,
          payload: null
        })
      );
  };