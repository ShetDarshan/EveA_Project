import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile, updateProfile } from '../../actions/profileActions';
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
    this.props.getProfile(user.email);
    this.props.getAllProfiles();
    
  }
  componentDidMount(){
    const { user } = this.props.auth;
    this.props.getProfile(user.email);
    }
  render() {

    // let { imagePreviewUrl } = this.state;
    const { profile,profiles } = this.props.users;
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

      <div className="container" style={{ borderStyle: "inset", backgroundColor: "#fafafa", marginTop: "50px" }}>
        <div className="row">{userEmail}</div>
        <img src={userImageUrl?userImageUrl:noPic} className="img-fluid" style={{ width: "200px", height: "200px" }}></img>
        <Link to="/updateProfile" className="btn btn-lg btn-info">Update Profile</Link>
        <div>
          <ul>
            {profiles.map((value, index) => {
              return <Link to={`/friend/${value.email}`} className="card-link">
               <li key={index}>{value.email}</li>
               </Link>
            })}
          </ul>
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