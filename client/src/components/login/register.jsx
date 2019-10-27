import React from "react";



export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container" style={{padding: "5px 5px"}} ref={this.props.containerRef}>
          <div className="row">
            <div className="col-md-8 m-auto">
     
          
        <h1 className="display-4 text-center">Register</h1>
        <p className="lead text-center">Sign Up with Evea</p>
        
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email Address</label>
              <input type="text" name="emailaddress" placeholder="Email-address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-enter Password</label>
              <input type="password" name="reenterpassword" placeholder="Re-enter Password" />
            </div>
          </div>
        </div>
        <button type="button" style={{color:"#000063"}} className="btn btn-info btn-block mt-4">
            Register
          </button>
          <p className="lead text-center"> Already a member? Login</p>
        </div>
      
          
        </div>
    );
  }
}