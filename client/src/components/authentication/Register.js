import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reguser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';
import {
  Snackbar,
  SnackbarContent
} from "@material-ui/core";

import './index.css'


 class Register extends Component {
     constructor() {
         super();
         this.state = {
             handle: '',
             email: '',
             password: '',
             confirmPassword:'',
             verified: false,
             signUp:false,
             errors:{ }
        };
     //   this.onChange = this.onChange.bind(this);
    //   this.onSubmit = this.onSubmit.bind(this);
     }
     componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }
     componentWillReceiveProps(nextProps){
       if(nextProps.errors){
         this.setState({errors: nextProps.errors});
       }
     }
onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
}
onSubmit = (e) => {
     e.preventDefault(); 
    const nuser =  {
        handle: this.state.handle,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
    };

    this.props.reguser(nuser,this.props.history);
    // console.log("errors",this.state.errors.)
    
    //   console.log("errors",this.state.errors)
    this.setState({
          signUp:true
    })
 
}
verifiedChange = e => {
  // e.preventDefault(); It's not needed
  const { verified } = e.target;
  this.setState({
    verified: !this.state.verified // It will make the default state value(false) at Part 1 to true 
  });
}; 
  render() {
    const { errors } = this.state;
    // const { signUp } = this.props.auth;
    return (
      <div className="container-fluid bg">
      <div className="row justify-content-center">
        <div className="col-12 col-sm=6 col-md-3">
         
   
           <form className="form-container" noValidate onSubmit={this.onSubmit}>
             
           <div className="form-group">
           <h4 className="text-center" style={{color:"#593196",paddingTop:"10px"}}>Create Account</h4>
           <TextFieldGroup
                  placeholder="User Name"
                  name="handle"
                  required=""
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  error={errors.confirmPassword}
                />
          <input type="checkbox" name="verified" id="verified" className="mr-2" onChange={this.verifiedChange} // Triggers the function in the Part 2
          value={this.state.verified}
      />
      <label for="verified" className="lead">
       <h6>  By continuing, I accept EveA  <Link to="/datapolicy" target="_blank" style={{color:"#0099CC"}}>Privacy Policy </Link> </h6>
      </label>
                <input 
                      type="submit" 
                      className="btn btn-primary btn-block" 
                       disabled={!this.state.verified} 
                      value="Sign Up" 
                      />
                    
        </div>
        <label for="verified">
        <p className="lead text-center">Already a member?  
                <Link  className="lead text-center" to="/login" style={{color:"#0099CC"}}> Log In</Link></p>
      </label>
              </form>
              {/* <Snackbar
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        autoHideDuration={3000}
                        open={this.state.signUp}
                        onClose={() => {
                            this.setState({
                                signUp: false
                            });
                        }}
                    >
                        <SnackbarContent
                            style={{
                                backgroundColor: this.state.signUp
                                    ? "green"
                                    : ""
                            }}
                            message={
                                this.state.signUp
                                    ? "Signed up successfully"
                                    : ""
                            }
                        />
                    </Snackbar> */}
                   
        </div>
      </div>
   
  </div>
    )
  }
}
  Register.propTypes = {
    reguser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

  };

  const mapStateToProps = state => ({
    auth : state.auth,
    errors: state.errors
  });
 
export default connect(mapStateToProps, { reguser }) (withRouter(Register));