import axios from 'axios';
import { SEND_REQ,GET_REQ ,ACC_REQ,REJ_REQ ,GOING_REQ ,N_GOING_REQ ,FRNDS_GOING,FRNDS_LIST} from './types';
var path = "";
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
      export const interestedEvent = (friend) => dispatch => {
        // dispatch({ type: LOADING_DATA });
        console.log("getreq:",friend);
        axios
          .post(path+'/api/v1/interestedActivities',friend)   
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
      export const friendsGoing = (friend) => dispatch => {
        // dispatch({ type: LOADING_DATA });
        console.log("friends Going:",friend);
        axios
          .post('/api/v1/friendsGoing',friend)   
          .then(res => 
            dispatch({
              type: FRNDS_GOING,
              payload: res.data
            })
          )
          .catch(err =>
            dispatch({
              type: FRNDS_GOING,
              payload: null
            })
          );
      }; 

      //getFriendsList
      export const getFriendsList = (email) => dispatch => {
        // dispatch({ type: LOADING_DATA });
        console.log("friends list:",email);
        axios
          .get(`/api/v1/getFriendsList/${email}`)   
          .then(res => 
            dispatch({
              type: FRNDS_LIST,
              payload: res.data
            })
          )
          .catch(err =>
            dispatch({
              type: FRNDS_LIST,
              payload: null
            })
          );
      }; 