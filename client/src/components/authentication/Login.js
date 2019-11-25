import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { luser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';
import './index.css'
import Face from '../layout/Face';

 class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors:{ }
            
       };
     //  this.onChange = this.onChange.bind(this);
     //  this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){  
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/eventboard');
      }
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/eventboard');
      }
      if(nextProps.errors){
        this.setState({errors: nextProps.errors});
      }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
          e.preventDefault(); 
        const user =  {
            email: this.state.email,
            password: this.state.password
        };
        this.props.luser(user);
    }
   
  render() {
    const { errors } = this.state;
    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
    
               <h4 className="display-5 text-center">Explore Events in Dublin</h4>
              {/* <h5 className="lead text-center">Sign in to your account</h5> */}
              <form onSubmit={this.onSubmit}>
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
                <div className="form-group">
                  <Link to="/forgotpwd" className="text-center btn btn-link">Forgot Password?</Link>
                   <input type="submit" className="btn btn-danger btn-block" value="Login" />
                </div>
                <Face/>
                <label>
                <h6 style={{fontSize:"2.3vh", alignContent:"center"}}>Not yet a member?<Link  to="/Register">
          Sign Up</Link> </h6>
      </label>
              </form>
            </div>
          </div>
        </div>
      </div>
     
    )
  }
}
Login.propTypes = {
  luser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps,{luser})(Login);