import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile, updateProfile } from '../../actions/profileActions';
import { getfriendRequestList } from '../../actions/friendActions';

import "../../css/profile.css";
import firebase from 'firebase';
import noPic from '../../img/noPic.jpg';
import { isNull } from 'util';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
// import { url } from 'inspector';
let userEmail, userName, userlocation, userInterests, userBirthday, userCreated, userId, userBio, userImageUrl, userAddress, userGender, userHandle = ""
class CreateProfile extends Component {
  
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    const profile = this.props.getProfile(user.email);
    this.props.getAllProfiles();
    this.props.getfriendRequestList(user.email);
    
  }
  componentDidMount(){
    const { user } = this.props.auth;
    console.log("user",user);
    this.props.getProfile(user.email);
    }
  acceptRequest = () => {
      this.props.acceptFriendRequest(this.state)
  }
  rejectRequest = () => {
    this.props.rejectFriendRequest(this.state)
}
  render() {

    // let { imagePreviewUrl } = this.state;
    const { profile, profiles } = this.props.users;
   // var { request  } =  this.props.friends;
    console.log("Profile",this.props.users);
    let allRequests=[];
     allRequests = this.props.friends.request.from;
    console.log("console request",allRequests);
    
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
    return (
      <div className="profile-page">
        {/* style={{backgroundImage:  "url(http://wallpapere.org/wp-content/uploads/2012/02/black-and-white-city-night.png)"}} */}
          <div className="page-header header-filter"   ></div> 
          {/* `url(${data.img})` */}
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row m-4">
                    <div className="w-75">
        	           <div className="profile">
                        <div  className="avtar float-left">
                             <div className="avtarImg" style={{backgroundImage: `url(${userImageUrl})`}}></div>
                             {/* <div className="avtarImg" style={{backgroundImage: `url(https://picsum.photos/id/237/200/300`}}></div> */}
                          </div>
	                      <div className="name float-left p-5">
	                            <h3 className="title text-capitalize">{userName}</h3>
                                {/* <Link to="/updateProfile" className="btn btn-lg btn-danger btn-sm">Edit Profile</Link> */}
                                <div className="description text-center mt-2">
                                    <p className="text-capitalize">{userBio}</p>
                                    <h6> Lives at: <b className="text-white bold">{userlocation}</b> </h6>
                                    <h6> Joined at: <b className="text-white bold">{userlocation}</b> </h6>
                                </div>
	                        </div>
                        <div className="clearfix"></div>
                      </div>
    	            </div>
                    <div className="w-25">
                        <Link to="/updateProfile" className="btn btn-sm btn-danger btn-sm d-lg-block m-2">Edit Profile</Link>
                        <Link to="/deleteProfile" className="btn btn-sm btn-danger btn-sm d-lg-block m-2">Delete Profile</Link>
                    </div>
                </div>
                <div className="row m-4">
                    <h6 className="w-100">Interests: <b className="text-white bold">{userInterests}</b> </h6>
                    <h6 className="w-100">Address: <b className="text-white bold">A</b> </h6>
                    <h6 className="w-100">Date Of Birth: <b className="text-white bold">d</b></h6>
                    <h6 className="w-100">Email: <b className="text-white bold">asd</b></h6>
                </div>
                          
                <div className="row">
                  <h5>Requests Recieved</h5>
                  <ul className="customFriendList">
                    {
                      allRequests && allRequests.map(data => {  
                           return (
                            <li className="m-2">
                               <h6 className="m-2 text-white">{data}</h6>
                               <button className="btn btn-lg btn-info btn-sm mr-2"
                                  onClick={() => {
                                      this.setState({
                                      })
                                      this.acceptRequest()
                                  }}> Accept Request
                              </button>
                              <button className="btn btn-lg btn-danger btn-sm mr-2"
                                  onClick={() => {
                                      this.setState({
                                      })
                                      this.rejectRequest()
                                  }}> Reject Request
                              </button>
                            </li>
                           )
                         })
                    }
                  </ul>
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
                              <div className="avtarImg" style={{backgroundImage: `url(${data.imageUrl})`}}></div>
      
                                    {/* <img src={data.imageUrl} alt="Circle Image" className="img-raised rounded-circle img-fluid"/> */}
                                    <h6 className="m-2 text-white">{data.handle}</h6>
                                    <Link to={`/friend/${data.email}`} className="btn btn-lg btn-danger btn-sm mr-2">View Profile</Link>
                                    {/* <a href="#" className="btn btn-lg btn-info btn-sm mr-2">View Profile</a>  */}
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
  auth: state.auth,
  friends : state.friends

})
export default connect(mapStateToProps, { getAllProfiles, getProfile ,getfriendRequestList})(CreateProfile);