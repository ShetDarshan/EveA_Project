import axios from 'axios';
import { GET_EVENTS,LOADING_DATA,GET_LEARNING,GET_EVENT_DETAILS,GET_RCMD_DETAILS,GET_LOC_DETAILS } from './types';
var path ="";
export const getEvents = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios({
      method: 'get',
      url: path+'/api/v1/events',
      params: {
        limit: 1000
      }
    }).then(function(res) { 
      console.log(res,"response")
      let  data = res.data,
            dataset ={},
            categoriesList = [];
            data.sort((a, b) => (a.category > b.category) ? 1 : -1)
            categoriesList = [...new Set(data.map(i1 => i1.category))];
            for (const key of categoriesList) {
                dataset[key] =  [];
            }  
            console.log("Data Category",data);
          data.forEach(data => {
            if(dataset[data.category].length <15){ 
              //console.log(dataset[data.category] );
              dataset[data.category].push(data);
            }
              
            })
        dispatch({
          type: GET_EVENTS,
          payload:dataset
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
    // axios
    //   .get('http://localhost:5000/api/v1/events') 
    //   .then(function(res) { 
    //     console.log(res,"response")
    //     let  data = res.data,
    //           dataset ={},
    //           categoriesList = [];
    //           data.sort((a, b) => (a.category > b.category) ? 1 : -1)
    //           categoriesList = [...new Set(data.map(i1 => i1.category))];
    //           for (const key of categoriesList) {
    //               dataset[key] =  [];
    //           }  
    //         data.forEach(data => {
    //           if(dataset[data.category].length <15)
    //               dataset[data.category].push(data);
    //           })
    //       dispatch({
    //         type: GET_EVENTS,
    //         payload:dataset
    //       })
    //     }
    //   )
    //   .catch(err =>
    //     dispatch({
    //       type: GET_EVENTS,
    //       payload: null
    //     })
    //   );
  };

  export const getLearning = () => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get('/api/v1/learning') 
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
  export const getEventDetails = title => dispatch => {
    // dispatch({ type: LOADING_DATA });
    axios
      .get(path+`/api/v1/eventDetails/${title}`) 
      .then(res => 
        dispatch({
          type: GET_EVENT_DETAILS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_EVENT_DETAILS,
          payload: null
        })
      );

  };

  export const getRecmdEvents = title => dispatch => {

    axios 
      .get(`https://evea-prj.appspot.com/api/recommendationData/${title}`)
      .then(res => 
        dispatch({
          type: GET_RCMD_DETAILS,
          payload: res.data
        })
      )
        .catch( err => 
          dispatch ({
          type: GET_RCMD_DETAILS,
          payload: null
        })
        
          );


  };
  export const getLocationEvents = title => dispatch => {

    axios 
      .get(`https://evea-prj.appspot.com/api/nearByData/${title}`)
      .then(res => 
        dispatch({
          type: GET_LOC_DETAILS,
          payload: res.data
        })
      )
        .catch( err => 
          dispatch ({
          type: GET_LOC_DETAILS,
          payload: null
        })
        
          );


  };