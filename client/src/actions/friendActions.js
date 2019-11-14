import axios from 'axios';
import { SEND_REQ,GET_REQ } from './types';

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

  export const getfriendRequestList = (friend) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    console.log("getreq:",friend);
    axios
      .get(`http://localhost:5000/api/v1/getfriendRequestList/${friend}`)   
      .then(res => 
        dispatch({
          type: GET_REQ,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_REQ,
          payload: null
        })
      );
  };