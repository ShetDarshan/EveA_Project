import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import { Provider } from 'react-redux';
import store from './store';


// if(localStorage.jwtToken){
//   setAuthToken(localStorage.jwtToken);
//   //decoding token and getting user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);
//   //setting to current user
//  store.dispatch(setCurrentUser(decoded));
//  //checking for  expired token
//  const CurrentTime = Date.now() /1000;
//  if (decoded.exp < CurrentTime){
//     store.dispatch(logoutuser());
//     store.dispatch(clearCurrentProfile());
//     window.location.href ='/login';
//  }
// }


class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
            </div>
            <Footer />  
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
