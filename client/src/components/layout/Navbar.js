
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutuser} from '../../actions/authActions'
import evealogo from '../../img/logo.png'

 class Navbar extends Component {
   onLogoutClick(e){
     //e.preventDefault();
     this.props.logoutuser();
   }
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={this.onLogoutClick.bind(this)}>Logout</Link>
                {/* <a href=""  onClick={this.onLogoutClick.bind(this)} className = "nav-link">{' '}
                Logout
                </a> */}
              </li>
            </ul>
    );

    const guestLinks = (    
      <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link" to="/login">Login</Link> 
      </li>
      <li className="nav-item">
       <Link className="nav-link" to="/guestuser"> Guest User</Link>
      </li>
    </ul>
      </div>
  
    );
    

    return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        
            <Link className="navbar-brand" to="/"><img src={evealogo} alt="EVEA" style={{width:'100px'}}/></Link>
  
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
         
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button> */}
    
          
            {isAuthenticated? authLinks : guestLinks} 
            
          </div>
      </nav>
    )
  }
}
Navbar.propTypes = {
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps,{ logoutuser }) (Navbar);