import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { luser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';
import './index.css'
import "./loginRegister.css";
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

        <div className="container-fluid bg">
            <div class="login">
              {/* <h5 className="lead text-center">Sign in to your account</h5> */}
              <form className="form-container pt-3 pl-5 pr-5" onSubmit={this.onSubmit}>
              <div className="form-group">
                <h4 className="text-center" style={{color:"#593196",paddingTop:"10px"}}>Explore Your Events in Dublin!</h4>
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
                 <Link to="/forgotpwd" className="text-center btn btn-link float-right" style={{color:"#0099CC"}}>Forgot Password?</Link>
                 <div className="clearfix"></div>
                   <input type="submit" className="btn btn-primary btn-block" value="Login" />
                  
                </div>
                {/* <Face className="form-group"/>                 */}
                
                <div className="form-group">
                <p className="lead text-center">Not a member? 
                <Link  className="lead text-center" to="/Register" style={{color:"#0099CC"}}> Sign Up</Link></p>
                </div>
              </form>
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