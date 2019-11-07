import axios from 'axios';
import { GET_ERRORS,SET_CURRENT_USER,GET_EVENTS,LOADING_DATA } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'


export const reguser = (userInfo,history) => dispatch => {
    axios
      .post('http://localhost:5000/register', userInfo)
      .then(res => {
        const { token } = res.data;
        setAuthToken(token);
          history.push('/login')})
      .catch(err => 
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
           );
};
export const luser = (userData) => (dispatch) => {
    axios
        .post('http://localhost:5000/login',userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthToken(token);
            //decoding token to get user information
            const decoded = jwt_decode(token);
            //setting current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        );
};

export const forgotpwd = (pwd,history) => (dispatch) =>{
    axios
        .post('http://localhost:5000/forgotpwd',pwd)   
        .then(
            history.push('/login')
        )    
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        );
};

  export const setCurrentUser = (decoded) => {
    return {
        type:SET_CURRENT_USER,
        payload: decoded
    };
    
};

export const logoutuser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};


// export const getEvents = () => (dispatch) => {
//     console.log("hi get events")
//     dispatch({ type: LOADING_DATA });
//     axios
//       .get('/api/v1/events')
//       .then((res) => {
//           console.log(res.data,"coming here for events data")
//         dispatch({
//           type: GET_EVENTS,
//           payload: res.data
//         });
//       })
//       .catch((err) => {
//         dispatch({
//           type: GET_EVENTS,
//           payload: []
//         });
//       });
//   };
// const setAuthorizationHeader = (token) => {
//     const FBIdToken = `Bearer ${token}`;
//     localStorage.setItem('FBIdToken', FBIdToken);
//     axios.defaults.headers.common['Authorization'] = FBIdToken;
//   };