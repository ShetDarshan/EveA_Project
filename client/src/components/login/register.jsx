import React from "react";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container" style={{padding: "5px 5px"}} ref={this.props.containerRef}>
          <div className="row">
            <div className="col-md-12 m-auto">
     
          
        <h6 className="display-4 text-center">Register</h6>
        <p className>Sign up with EveA</p>
        
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email Address</label>
              <input type="text" name="EmailAddress" placeholder="EmailAddress" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="Password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-Enter Password</label>
              <input type="password" name="Re-Enter Password" placeholder="Re-Enter Password" />
            </div>
           
          </div>
        
        <button type="button" style={{color:"Red"}} className="btn btn-info btn-block mt-4">
            Register
          </button>
          <p>Not yet a member? Register</p>
        </div>
      
        </div>
        </div>
    );
  }
}