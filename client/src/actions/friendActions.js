import axios from 'axios';
import { SEND_REQ,GET_REQ ,ACC_REQ,REJ_REQ ,GOING_REQ ,N_GOING_REQ} from './types';
var path = "http://localhost:5000";
export const sendFriendRequest = (friend) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    console.log("frienReq:",friend);
    axios
      .post(path+'/api/v1/sendFriendRequest',friend)   
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
      .get(path+`/api/v1/getfriendRequestList/${friend}`)   
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
  export const acceptFriendRequest = (friend) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    console.log("frienReqACC:",friend);
    axios
      .post(path+'/api/v1/acceptRequest',friend)   
      .then(res => 
        dispatch({
          type: ACC_REQ,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: ACC_REQ,
          payload: null
        })
      );
  };
  export const rejectFriendRequest = (friend) => dispatch => {
    // dispatch({ type: LOADING_DATA });
    console.log("frienReqREJ:",friend);
    axios
      .post(path+'/api/v1/rejectRequest',friend)   
      .then(res => 
        dispatch({
          type: REJ_REQ,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: REJ_REQ,
          payload: null
        })
      );
    }
      export const goingEvent = (friend) => dispatch => {
        // dispatch({ type: LOADING_DATA });
        console.log("getreq:",friend);
        axios
          .post(path+'/api/v1/goingActivities',friend) 
          .then(res => 
            dispatch({
              type: GOING_REQ,
              payload: res.data
            })
          )
          .catch(err =>
            dispatch({
              type: GOING_REQ,
              payload: null
            })
          );
      };
      export const notGoingEvent = (friend) => dispatch => {
        // dispatch({ type: LOADING_DATA });
        console.log("getreq:",friend);
        axios
          .post(path+'/api/v1/notGoingActivities',friend)   
          .then(res => 
            dispatch({
              type: N_GOING_REQ,
              payload: res.data
            })
          )
          .catch(err =>
            dispatch({
              type: N_GOING_REQ,
              payload: null
            })
          );
      }; 
