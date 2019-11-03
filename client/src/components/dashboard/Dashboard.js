import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getEvents} from '../../actions/eventActions';


class Dashboard extends Component {
  componentDidMount(){
    console.log("inside in getevents")
    this.props.getEvents();
  }

    render() {
      const { user } = this.props.auth;
      const { event,loading } = this.props.events;
      console.log(event,"events")

  
      let dashboardContent;
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {user.email} </p>
              <p>You have not yet setup a profiles, please add some info</p>
              <Link to="/createProfile" className="btn btn-lg btn-info">
                Create New Profile
              </Link>
            </div>
          );
  
      return (
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
  });
  export default connect(mapStateToProps,{getEvents})(Dashboard);
  