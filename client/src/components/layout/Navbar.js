import algoliasearch from 'algoliasearch/lite';
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
      <div className="collapse navbar-collapse" style={{color:"#fffff"}}>
            <ul className="navbar-nav mr-auto">
<<
      <li className="nav-item">
        <Link className="nav-link" to="/About"><h6 style={{color:"white"}}>ABOUT US</h6></Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link" to="/guestuser"><h6 style={{color:"white"}}>GUEST USER</h6></Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link" to="/Register"><h6 style={{color:"white"}}>SIGN UP</h6></Link>
      </li>

      {/* <li>
      <InstantSearch indexName="algoevents" searchClient={searchClient}>
          <SearchBox />
            <Hits hitComponent={Hit} />
          <Pagination />
        </InstantSearch>
      </li> */}
    </ul>
      </div>
  
    );
    

    return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        
            <Link className="navbar-brand" to="/login"><img src={evealogo} alt="EVEA" style={{width:'100px'}}/></Link>
  
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
// function Hit(props) {
//   return (
//     <div>
//       <img src={props.hit.image} align="left" alt={props.hit.title} />
//       <div className="hit-name">
//         <Highlight attribute="title" hit={props.hit} />
//       </div>
//       {/* <div className="hit-description">
//         <Highlight attribute="description" hit={props.hit} />
//       </div>
//       <div className="hit-price">${props.hit.title}</div> */}
//     </div>
//   );
// }
// Hit.propTypes = {
//   hit: PropTypes.object.isRequired,
// };
Navbar.propTypes = {
 
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps,{ logoutuser }) (Navbar);