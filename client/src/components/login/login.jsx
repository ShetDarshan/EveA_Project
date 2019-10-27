import React from "react";



export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container" style={{padding: "5px 5px"}} ref={this.props.containerRef}>
          <div className="row">
            <div className="col-md-8 m-auto">
     
          
        <h1 className="display-4 text-center">Login</h1>
        <p className="lead text-center">Sign in to your account</p>
        
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
          <p className="lead text-center">Not yet a member? Register</p>
        </div>
      
        </div>
        </div>
    );
  }
}