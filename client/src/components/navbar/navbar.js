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
import evealogo from '../../img/logo.png';
import "./navbar.css";


 class Navbar extends Component {
   constructor(props){
      super(props);
      this.state = {
        className: ""
      };
      this.headerClick = this.headerClick.bind(this);
   }
   onLogoutClick(e){
     //e.preventDefault();
     this.props.logoutuser();
   }
   headerClick(e) {

      this.setState(state => ({
        headerToggle: !state.headerToggle
      }));
     console.log("clicked",e.currentTarget.dataset.toggle);
     if(e.currentTarget.dataset.toggle == "collapse"){
        document.getElementsByClassName("navbar-collapse")[0].classList.add("show");
        e.currentTarget.dataset.toggle = "expanded";
     } else {
      e.currentTarget.classList.remove("mystyle");
        e.currentTarget.dataset.toggle = "collapse";
        document.getElementsByClassName("navbar-collapse")[0].classList.remove("show");
     }
     //console.dir(e.currentTarget.dataset.toggle);
   }
  

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                   <Link className="nav-link" to="/login" onClick={this.onLogoutClick.bind(this)}>Logout</Link>
                {/* <a href=""  onClick={this.onLogoutClick.bind(this)} className = "nav-link">{' '}
                Logout
                </a> */}
              </li>
            </ul>
    );
    const searchClient = algoliasearch(
      '7Z6VFB8JQD',
      'fe812c7ddbd852cb3074294b24c7e641'
    );
    const guestLinks = (    
      <div className="collapse navbar-collapse" id="navbarColor02">
        {/*<ul className="navbar-nav mr-auto text-white">
        
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
             <Link className="nav-link" to="/About">About Us</Link>
          </li>
          {/* <li className="nav-item">
           <Link className="nav-link " to="/guestuser">Guest User</Link>
          </li> 
          <li className="nav-item">
                 <Link className="nav-link" to="/Register">Sign Up</Link>
          </li>
        </ul>*/}


        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" id="Search"/>
          <Link className="nav-link" to="/Search">Search</Link>
        </form>
      </div>
    );
    

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        
            <Link className="navbar-brand" to="/login"><img src={evealogo} alt="EVEA" style={{width:'100px'}}/></Link>
            
          <button onClick={this.headerClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
    </button>
         
         {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
    </button>*/}
    
          
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