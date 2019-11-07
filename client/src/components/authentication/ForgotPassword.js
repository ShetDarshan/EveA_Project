import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotpwd } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

 class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            errors:{ }
       };
     //  this.onChange = this.onChange.bind(this);
     //  this.onSubmit = this.onSubmit.bind(this);
    }
    // componentDidMount(){  
    //     this.props.history.push('/login');
    // }
    // componentWillReceiveProps(nextProps){
    //   if(nextProps.auth.isAuthenticated) {
    //     this.props.history.push('/eventboard');
    //   }
    //   if(nextProps.errors){
    //     this.setState({errors: nextProps.errors});
    //   }
    // }
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
        const pwd =  {
            email: this.state.email
        };
        this.props.forgotpwd(pwd,this.props.history);
    }
  render() {
    const { errors } = this.state;
    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
    
              {/* <h1 className="display-4 text-center">Log In</h1> */}
              <p className="lead text-center" style={{color:"white", paddingTop:"55px"}}>Enter Your Registered Email Address to <b>Reset Password</b></p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                 <input type="submit" className="btn btn-danger btn-block mt-4" value="Submit" disabled={!this.state.email}/>
              </form>
            </div>
          </div>
        </div>
      </div>
     
    )
  }
}
ForgotPassword.propTypes = {
forgotpwd: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps,{forgotpwd})(ForgotPassword);