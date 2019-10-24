import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Face from "../../components/layout/Face";
 class Landing extends Component {
  render() {
    return (
        <div className="landing">
         <div className="dark-overlay landing-inner text-light"> 
          <div className="container">
            {/* <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Never Miss an Event
                </h1>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-info mr-2">Login</Link>
                <Face />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
export default Landing;