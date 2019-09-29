import axios from 'axios';
import { GET_ERRORS,SET_CURRENT_USER } from './types';
// import jwt_decode from 'jwt-decode'




export const reguser = (userInfo,history) => dispatch => {
      axios
        .post('/api/v1/register', userInfo)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            history.push('/login')})
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
             );
};

export const loginUser = (userData, history) => (dispatch) => {
    axios
      .post('/api/v1/login', userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        // localStorage.setItem('jwtToken',token);
        // const decoded = jwt_decode(token);
        // dispatch(setCurrentUser(decoded));
        history.push('/register')
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
//   export const setCurrentUser = (decoded) => {
//     return {
//         type:SET_CURRENT_USER,
//         payload: decoded
//     };
    
// };

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };