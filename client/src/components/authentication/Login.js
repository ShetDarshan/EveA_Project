import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { luser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

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
        this.props.history.push('/dashboard');
      }
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
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
    
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your account</p>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
                <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
                <div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0&appId=2404555833134862&autoLogAppEvents=1"></script>
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