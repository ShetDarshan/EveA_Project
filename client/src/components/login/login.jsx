import React from "react";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container" ref={this.props.containerRef}>
          <div className="row">
            <div className="col-md-12 m-auto">
     
          
        <h6 className="display-4 text-center">Login</h6>
        <p className>Sign in to your account</p>
        
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email Address</label>
              <input type="text" name="emailaddress" placeholder="emailaddress" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        
        <button type="button" style={{color:"Red"}} className="btn btn-info btn-block mt-4">
            Login
          </button>
          <p>Not yet a member? Register</p>
        </div>
        </div>
        </div>
    );
  }
}