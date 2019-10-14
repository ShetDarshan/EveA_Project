import React, { Component } from 'react';
import './App.css';
import './App.scss';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Register';
import Dashboard from './components/dashboard/Dashboard';
import Eventboard from './components/dashboard/Eventboard';
import SlideShow from './SlideShow';
import Login from './components/authentication/Login';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutuser } from './actions/authActions';


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  //decoding token and getting user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //setting to current user
 store.dispatch(setCurrentUser(decoded));
 //checking for  expired token
 const CurrentTime = Date.now() /1000;
 if (decoded.exp < CurrentTime){
    store.dispatch(logoutuser());
    window.location.href ='/login';
 }
}


class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Router>
          <div className="App">

            <Route exact path="/" component={Landing} />
            <div className="container">
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/eventboard" component={Eventboard}/>
                <Route exact path="/guestuser" component={SlideShow}/>
            </div>
            
            
            
          </div>
          
        </Router>
        
      </Provider>
      
    );
  }
}

export default App;
