import axios from 'axios';
import { GET_ERRORS,SET_CURRENT_USER } from './types';




export const reguser = (userInfo,history) => dispatch => {
      axios
        .post('/api/v1/register', userInfo)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
             );
};