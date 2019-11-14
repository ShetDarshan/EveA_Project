import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile, updateProfile } from '../../actions/profileActions';
import "../../css/profile.css";
import firebase from 'firebase';
import noPic from '../../img/noPic.jpg';
import { isNull } from 'util';
import { Link } from 'react-router-dom';
// import { url } from 'inspector';
let userEmail, userName, userlocation, userInterests, userBirthday, userCreated, userId, userBio, userImageUrl, userAddress, userGender, userHandle = ""
class CreateProfile extends Component {
  
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    const profile = this.props.getProfile(user.email);
      console.log("Constructor",profile);
    this.props.getAllProfiles();
    
  }
  componentDidMount(){
    const { user } = this.props.auth;
    console.log("user",user);
    this.props.getProfile(user.email);
    }
  render() {

    // let { imagePreviewUrl } = this.state;
    const { profile, profiles } = this.props.users;
    console.log("Profile",this.props.users);
    if (profile) {
      profile.map(values => {
        userEmail = values.email;
        userName = values.handle;
        userCreated = values.createdAt;
        userId = values.userId;
        userBio = values.bio;
        userAddress = values.address;
        userInterests = values.interests;
        userlocation = values.location;
        userBirthday = values.birthday;
        userImageUrl = values.imageUrl;
        userGender = values.gender;
      });
      
    }
    if(profiles){
        console.log("list of profiles",profiles)
    }
    return (
      <div className="profile-page">
        {/* style={{backgroundImage:  "url(http://wallpapere.org/wp-content/uploads/2012/02/black-and-white-city-night.png)"}} */}
          <div className="page-header header-filter"   ></div> 
          {/* `url(${data.img})` */}
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                    <div className="col-md-6 ml-auto mr-auto">
        	           <div className="profile">
	                        <div className="avtar">
	                            <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg" alt="Circle Image" className="img-raised rounded-circle img-fluid"/>
	                        </div>
	                        <div className="name">
	                            <h3 className="title">User Name</h3>
							                	<h6>Student</h6>
                                <Link to="/updateProfile" className="btn btn-lg btn-info btn-sm">Edit Profile</Link>
                                <div className="description text-center mt-2">
                                    <p>User description. Please make sure you are giving enough description to fill in the contents </p>
                                    <h6> Studied at: <b className="text-white bold">Some text</b> </h6>
                                    <h6> Joined at: <b className="text-white bold">Some text</b> </h6>
                                    <h6> Lives at: <b className="text-white bold">Some text</b> </h6>
                                    <h6> From: <b className="text-white bold">Some text</b> </h6>
                                </div>
	                        </div>
	                    </div>
    	            </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ml-auto mr-auto">
                      <h5>Suggested Friends</h5>
                      <ul className="customFriendList">
                      { 
                        profiles && profiles.map(data => {
                        return(
                       
                          <li className="m-2">
                             <div className="card border-primary mb-3 text-center">
                             <div className="friendAvtar">
                                    <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg" alt="Circle Image" className="img-raised rounded-circle img-fluid"/>
                                    <h6 className="m-2 text-white">{data.handle}</h6>
                                    <a href="#" className="btn btn-lg btn-info btn-sm mr-2">Add Friend</a>
                                    <a href="#" className="btn btn-lg btn-info btn-sm mr-2">Remove</a>
                                  {/* <Link to="/updateProfile" className="btn btn-lg btn-info btn-sm">Edit Profile</Link>
                                  <Link to="/updateProfile" className="btn btn-lg btn-info btn-sm">Edit Profile</Link> */}
                                </div>
                                 </div>
                          </li>
                       
                         )})}
                          </ul>
                    </div>
                </div>
              </div>
            </div>
          </div>
       </div>
    )
  }

}

const mapStateToProps = state => ({
  //getting the user list from profileReducer and auth from authReducer
  users: state.users,
  auth: state.auth

})
export default connect(mapStateToProps, { getAllProfiles, getProfile })(CreateProfile);