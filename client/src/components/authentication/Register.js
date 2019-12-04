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
import "./loginRegister.css";


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
       <div class="register">
         
   
           <form className="form-container pt-3 pl-5 pr-5" noValidate onSubmit={this.onSubmit}>
             
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
      <h6>  By continuing, I accept EveA <Link to="/datapolicy" target="_blank" data-toggle="modal" data-target="#exampleModalLong" style={{color:"#0099CC"}}>
   Privacy Policy
</Link>


<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Privacy Policy</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p >EVEA fully respects your right to privacy and actively seeks to preserve the privacy rights of those who share information with us. Any personal information which you volunteer to us will be treated with the highest standards of security and confidentiality, in accordance with Irish and European Data Protection legislation. Personal data will be processed shall in accordance with the General Data Protection Regulation (EU) 2016/679 and the Data Protection Act 2018.</p>
             <b >How we collect your personal data?</b>
             <p >Our application collects the following data:


            <br></br>   Personal Identification Information (Name, email address)

            <br></br>The data we collect from you will be used only in accordance with the purposes outlined in this privacy notice.
             <br></br>We will collect data and process it when you:

            <br></br>*  Sign up on the application and while creating a profile on the website. This will be in electronic form.

            <br></br>* Voluntarily complete a customer survey or provide feedback on any of our message boards.

            <br></br>* Use or view our website via your browser’s cookies</p>  

            <b >How will we use your personal data?</b>
            <p >The data collected in this form will be used so that we can:

            <br></br>* Manage your profile
            <br></br>* Email you on password recovery
            <br></br>* Send personal Recommendations</p>

            <b >The purpose and legal basis for collecting your data</b>

            <p >The application will ensure that your data is processed fairly and
             lawfully in keeping with the principles of data protection. For the purposes outlined in this 
             privacy notice your personal data will be processed based on user’s consent.
            </p>
            <b >How we store and secure your data</b>
            <p >Any data we collect from you will be stored confidentially and securely as required by the Application’s Information Security Policy. Our application securely stores your data at secure IT platform.
            The application is committed to ensuring all accesses to, uses of, and processing of data is performed in a secure manner.
            In keeping with the data protection principles, we will only store your data for as long as is necessary. For the purposes described here we will store your data for 6 months. Once this time period has expired, we will delete your data using user’s last login timestamp.
            When we store your personal data on our systems the data will be stored on the secure IT platforms within the EEA which are also subject to European data protection requirements.</p>
            <b >Details of third parties with whom we share personal data</b>
            <p >Our application will never share your data with any third parties.</p>
            <b >What are your data protection rights?</b>
            <p >Our application would like to make sure that you are fully aware of all your data protection rights. 
            Every user is entitled the following:</p>
            <b >Right of Access</b>
            <p >You have the right to request a copy of the personal data we are processing about you and to exercise that right easily and at reasonable intervals.</p>
            <b >Consent</b>
            <p >You have the right to withdraw your consent where that is the legal basis of our processing.</p>
            <b >Rectification</b>
            <p >You have the right to have inaccuracies in personal data that we hold about you rectified.</p>
            <b >Erasure</b>
            <p >You have the right to have your personal data deleted where we no longer have any justification for retaining it subject to exemptions such as the use of pseudonymised data for scientific research.</p>
            <b >Object</b>
            <p >You have the right to object to processing your personal data if:
            <br></br>* We have processed your data based on a legitimate interest or for the exercise of the public tasks, if you believe the processing to be disproportionate or unfair to you.
            <br></br>* The personal data will be processed for the purposes of direct marketing or profiling related to direct marketing.
            </p>
            <b >Restriction</b>
            <p >You have the right to restrict the processing of your personal data if:
            <br></br>
            * You are contesting the accuracy of the personal data;
            <br></br> 
            * The personal data was processed unlawfully;
            <br></br>
            * You need to prevent the erasure of the personal data in order to comply with legal obligations;
            <br></br>
            * You have objected to the processing of the personal data and wish to restrict the processing until a legal basis for continued processing has been verified.
             </p>   
             <b >Portability</b>
             <p >Where it is technically feasible you have the right to have a readily accessible machine readable copy of your data transferred or moved to another data controller where we are processing your data based on your consent and if that processing is carried out by automated means.
            </p>
            <b >Contact</b>
            <p >If you have any queries relating to the processing of your personal data for the purposes outlined above or you wish to make a request in relation to your rights you can contact: Write us at: d17129113@mytudublin.ie, d18123606@mytudublin.ie, d17129910@mytudublin.ie</p>
            <b >What are Cookies?</b>
            <p >Cookies are text files placed on your computer to collect standard Internet log information and visitor behaviour information. When you visit our website, we may collect information from you automatically through cookies or similar technology. For further information visit https://www.allaboutcookies.org/</p>
            <b >How do we use cookies?</b>
            <p >Our application uses cookies in a range of ways to improve your excellence on our website, including:
            <br></br>
            * Keeping you signed in
            <br></br>
            * Understanding how you use our website</p>
            <b >How to manage cookies?</b>
            <p >You can set your browser not to accept cookies, and the above website tells you how to remove cookies from your browser. However, in a few cases some of our website features may not function as a result.</p>
            <b >Privacy policies of other websites</b>
            <p >Our application website contains links to other websites. Our privacy policy applies only to our website, so if you click on the link to other website you should read their privacy policy.</p>
            <b >Changes to our privacy policy</b>
            <p >The application keeps its privacy policy under regular review and places any updates on this website page. This privacy policy was last updated on 09 oct 2019.</p>
            <b >How to contact us</b>
            <p >If you have any questions about your application’s privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.Write us at: d17129113@mytudublin.ie, d18123606@mytudublin.ie, d17129910@mytudublin.ie</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>

 </h6>
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