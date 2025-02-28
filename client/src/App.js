import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Register from './components/authentication/Register';
import Landing from './components/layout/Landing';
import Splash from './components/layout/Splash';
import Dashboard from './components/dashboard/Dashboard';
import MainCorousel from './components/eventboard/eventMainPage';
import Guestuser from './components/guestUser/Guestuser';
import Login from './components/authentication/Login';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutuser } from './actions/authActions';
import Navbar from './components/navbar/navbar';
import Footer from './components/layout/Footer';
import CreateProfile from './components/dashboard/CreateProfile';
import UpdateProfile from './components/dashboard/UpdateProfile';
import ForgotPassword from './components/authentication/ForgotPassword'
import DataPolicy from './components/authentication/DataPolicy'
import EventDetails from './components/eventCategories/EventDetails';
import Search from './components/dashboard/Search';
import SearchUsers from './components/dashboard/SearchUsers';
import Friend from './components/friends/Friend';
import { FirstPage } from '@material-ui/icons';


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
    window.location.href ='./login';
 }
}


class App extends Component {
  render() {
    return (
      
      <Provider store ={store}>
        <Router>
        <Navbar/>
        <div className="App">
            <Route exact path="/" component={Splash} />
            <div className="container-flex mb-0"  >
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/eventBoard" component={MainCorousel}/>
                {/* <Route exact path="/eventBoard" component={eventCategories}/> */}
                <Route exact path="/event/:title" component={EventDetails} />
                <Route exact path="/guestuser" component={Guestuser}/>
                <Route exact path="/profile" component={CreateProfile}/>
                <Route exact path="/updateProfile" component={UpdateProfile}/>
       <Route exact path="/forgotpwd" component={ForgotPassword}/>
                <Route exact path="/datapolicy" component={DataPolicy}/>


                <Route exact path="/search" component={Search}/>
            
                <Route exact path="/searchUsers" component={SearchUsers}/>

                <Route exact path="/friend/:email" component={Friend}/>
            </div>  

        </div>  
        <Footer />
        </Router>
        
      </Provider>
      
    );
  }
}

export default App;
