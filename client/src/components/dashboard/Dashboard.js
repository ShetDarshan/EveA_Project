import React, { Component } from 'react';

class Dashboard extends Component {
    render(){
        let dashboardContent;
        dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome </p>
              <p>You have not yet setup a profile, please add some info</p>
              {/* <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link> */}
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
      )
    }
  
}
export default Dashboard;