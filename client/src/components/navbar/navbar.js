import algoliasearch from 'algoliasearch/lite';
import $ from "jquery";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logoutuser} from '../../actions/authActions';
import evealogo from '../../img/Evea.png';
// import {Search} from "../dashboard/Search";
import "./navbar.css";

 class Navbar extends Component {
   constructor(props){
      super(props);
      this.state = {
        className: ""
      };
      this.headerClick = this.headerClick.bind(this);
      this.onLogoutClick =  this.onLogoutClick.bind(this);
   }
   onLogoutClick(e) {
    this.props.logoutuser();
   }
   headerClick(e) {
      var elem = document.getElementById("navbarResponsive");
      this.setState(state => ({
        headerToggle: !state.headerToggle
      }));
      console.log(document.getElementsByClassName("show").length);
      if(document.getElementsByClassName("show").length === 0){
        elem.classList.add("show");
      } else {
        elem.classList.remove("show");
      }
   }
  render() {
    const { isAuthenticated } = this.props.auth;
    const  authorisedLink  =  (
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item "><Link className="nav-link home-link" to="/eventboard">Home</Link></li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-nowrap" data-toggle="dropdown" to="/profile"
              role="button" aria-haspopup="true" aria-expanded="true">Profile
                {/* <span class="d-none d-md-inline-block">Profile</span> */}
                </Link>
              <div className="dropdown-menu dropdown-menu-small">
              <a class="dropdown-item" href="/profile" style={{color:"#ffbb33"}}>
                <i class="fas fa-user"></i>
My Profile
                </a>
                {/* <a class="dropdown-item" href="/updateProfile" style={{color:"#ffbb33"}}>
                <i class="fas fa-edit"></i>
Edit Profile
                </a> */}
                <a class="dropdown-item"  href="/login" onClick={this.onLogoutClick} style={{color:"red"}}>
                <i class="fas fa-sign-out-alt"></i>
                Logout</a>

              </div>
              </li>
         
          </ul>
      );
      const guestUser = (
        <ul className="navbar-nav ml-auto ">
             <li><Link className="nav-link home-link" to="/eventboard">Home</Link></li>
             <li className="nav-item "><Link className="nav-link" to="/register">Signup</Link></li>
             <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          </ul>
      );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
          <Link className="navbar-brand" to="/login"><img src={evealogo} alt="EVEA" style={{width:'75px'}}/></Link>         
          <button onClick={this.headerClick} className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarResponsive" className="navbar-collapse collapse ">
              {isAuthenticated? authorisedLink : guestUser }
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