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
    //  e.preventDefault();
    //  e.stopPropogation();
     console.log("Inisde Logout------------------------------",e);
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
   }
   
  render() {
    const { isAuthenticated } = this.props.auth;
    const  authorisedLink  =  (
        <ul className="navbar-nav ml-auto ">
            <li className="nav-item "><Link className="nav-link" to="/profile">Profile</Link></li>
            <li><Link className="nav-link home-link" to="/eventboard">Home</Link></li>
            {/* <li className="nav-item"><Link className="nav-link" to="/Search">Search</Link></li> */}
            <li key="logout" className="nav-item">
                <Link className="nav-link" to="/login" onClick={this.onLogoutClick}>Logout</Link></li>
          </ul>
      );
    
      const guestUser = (
        <ul className="navbar-nav ml-auto ">
             <li><Link className="nav-link home-link" to="/eventboard">Home</Link></li>
             <li className="nav-item "><Link className="nav-link" to="/register">Signup</Link></li>
             <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
             {/* <li className="nav-item"><Link className="nav-link" to="/Search">Search</Link></li> */}
             
          </ul>
      );
    
    function  handleKeydown() {
      window.location.href = '/Search';
      console.log("Keydown Clicked");
    }
    const searchClient = algoliasearch(
      '7Z6VFB8JQD',
      'fe812c7ddbd852cb3074294b24c7e641'
    );
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/login"><img src={evealogo} alt="EVEA" style={{width:'75px'}}/></Link>         
          <button onClick={this.headerClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
           {/* <Link className="nav-link home-link" to="/login">Home</Link> */}
            <form className="form-inline-block my-2 my-lg-0 w-25">
              {/* <input className="form-control mr-sm-2" type="text" placeholder="Search Events" id="Search" onKeyDown={handleKeydown}/> */}
            
             {/* <SearchBox/> */}
                {/* <Link className="nav-link" to="/Search">Browse Events</Link> */}
            </form>
                {/* {isAuthenticated && AuthorisedLink}
                {!isAuthenticated && <GuestUser />} */}
                {isAuthenticated? authorisedLink : guestUser }
            {/* <li>{isAuthenticated? authLinks : guestLinks}</li> */}
           {/* <ul className="navbar-nav ml-auto ">
              <li className="nav-item ">
                  <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                   <Link className="nav-link" to="/login" onClick={this.onLogoutClick.bind(this)}>Logout</Link>
              </li>
            </ul> */}
          <div className="clearfix"></div>
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