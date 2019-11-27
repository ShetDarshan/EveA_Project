import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile, updateProfile } from '../../actions/profileActions';
import { getfriendRequestList,acceptFriendRequest,rejectFriendRequest } from '../../actions/friendActions';

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
    this.state = {
      loggedUser :'',
      requestedUser : ''
    };
    const { user } = this.props.auth;
    const profile = this.props.getProfile(user.email);
    this.props.getAllProfiles();
    this.props.getfriendRequestList(user.email);

  }
  componentDidMount() {
    const { user } = this.props.auth;
    console.log("user", user);
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
    console.log("Profile", this.props.users);
    let allRequests = [];
    allRequests = this.props.friends.request.from;
    console.log("this.props.friends.request.from",this.props.friends.request.from);
    console.log("console request", allRequests);

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
        <div className="page-header header-filter"></div>
        {/* `url(${data.img})` */}
        <div className="main main-raised">
          <div className="profile-content">
            <div className="container">
              <div className="row m-4">
                <div className="w-75">
                  <div className="profile">
                    <div className="avtar float-left">
                      <div className="avtarImg" style={{ backgroundImage: `url(${userImageUrl})` }}></div>
                      {/* <div className="avtarImg" style={{backgroundImage: `url(https://picsum.photos/id/237/200/300`}}></div> */}
                    </div>
                    <div className="name float-left m-5">
                      <h2 className="title text-capitalize font-weight-bold text-priamry">{userName}</h2>
                      <Link to="/updateProfile" className="btn btn-sm btn-primary btn-sm d-lg-block m-2">Edit Profile</Link>
                      {/* <Link to="/updateProfile" className="btn btn-lg btn-danger btn-sm">Edit Profile</Link> */}
                      <div className="description text-center mt-2">
                        <p className="text-capitalize">{userBio}</p>
                        <h6><span className="text-muted">Lives at:</span> <b className="bold">{userlocation}</b> </h6>
                        <h6><span className="text-muted">Joined at:</span><b className="bold">{userlocation}</b> </h6>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>                
                <div className="w-25">
                <h4 className="text-primary">Requests Received</h4>
                  <ul className="friendRequestList ">
                    {
                      allRequests && allRequests.map(data => {
                        return (
                          <li className="m-2 card border-primary ">
                            <div className=""><div class="friendAvtar text-center">
                              <div className="avtarImg" style={{ backgroundImage: `url(https://i1.sndcdn.com/avatars-000316300368-x3f9sd-t500x500.jpg)` }}></div>

                              <h6 className="m-2 text-white">{data}</h6>
                              <button className="btn btn-sm btn-info btn-sm mr-2" 
                              onClick={() => {
                                this.setState({
                                  loggedUser: userEmail,
                                  requestedUser: data,
                                })
                                this.acceptRequest()
                            }}> Accept Request</button>
                              <button className="btn btn-sm btn-primary btn-sm"
                              onClick={() => {
                                this.setState({
                                  loggedUser: userEmail,
                                  requestedUser: data,
                                })
                                this.rejectRequest()
                            }}> Reject Request</button>
                            </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div> 
              </div>
              <div className="row m-4">
                <h6 className="w-100"><span className="text-muted">Interests:</span> <b className="bold">{userInterests}</b> </h6>
                <h6 className="w-100"><span className="text-muted">Address:</span><b className="bold">{userAddress}</b> </h6>
                <h6 className="w-100"><span className="text-muted">Date Of Birth:</span> <b className="bold">{userBirthday}</b></h6>
                <h6 className="w-100"><span className="text-muted">Email:</span> <b className="bold">{userEmail}</b></h6>
              </div>
              {/* <div className="row">
                <div className="col-md-12 ml-auto mr-auto">
                </div>
              </div> */}

              <div className="row">
                <div className="col-md-12 ml-auto mr-auto">
                  <h4 className="text-primary">Suggested Friends</h4>
                  <ul className="customFriendList">
                    {
                      profiles && profiles.map(data => {
                        return (

                          <li key={"profile-"+data} className="card border-primary m-2 p-2">
                            <Link key={"profile-link-"+data.handle} to={`/friend/${data.email}`}>
                                <div key={"profile-container-"+data.handle} className="text-center">
                                  <div key={"profile-friendAvtar-"+data.handle} className="friendAvtar m-auto">
                                    <div key={"profile-background-"+data.handle} className="avtarImg" style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
                                  </div>
                                </div>
                                <h5 key={"profile-handle-"+data.handle} className="mt-2 text-primary text-center font-weight-bold">{data.handle}</h5>
                            </Link>
                          </li>
                        )
                      })}
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
  friends: state.friends

})
export default connect(mapStateToProps, { getAllProfiles, getProfile, getfriendRequestList,rejectFriendRequest,acceptFriendRequest })(CreateProfile);