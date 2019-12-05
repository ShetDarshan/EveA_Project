import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile, updateProfile, getSuggestedFrds } from '../../actions/profileActions';
import Slider from "react-slick";
import { getfriendRequestList, acceptFriendRequest, rejectFriendRequest ,getFriendsList} from '../../actions/friendActions';

import firebase from 'firebase';
import noPic from '../../img/noPic.jpg';
import { isNull } from 'util';
import { Link } from 'react-router-dom';
import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
import "../../css/profile.css";
import card from "../../img/cover.png";
import user from "../../img/user.png";

// import { url } from 'inspector';
let userEmail, userName, userlocation, userInterests, userBirthday, userCreated, userId, userBio, userImageUrl, userAddress, userGender, userHandle = ""
class CreateProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: '',
      requestedUser: '',
      msg: false
    };
    const { user } = this.props.auth;
    this.props.getProfile(user.email);
    this.props.getFriendsList(user.email);
    this.props.getAllProfiles();
    this.props.getfriendRequestList(user.email);
    this.props.getSuggestedFrds(user.email)

  }
  componentDidMount() {
    const { user } = this.props.auth;
    console.log("user", user);
    this.props.getProfile(user.email);
  }
  // acceptRequest = () => {
  //   this.props.acceptFriendRequest(this.state)
  // }
  // rejectRequest = () => {
  //   this.props.rejectFriendRequest(this.state)
  // }
  render() {
    const { profile, profiles, sugessted } = this.props.users;
    const { friendsList } = this.props.friends
    // var { request  } =  this.props.friends;
    console.log("suggested", sugessted);
    const setting = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: false} },
        {breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 1, dots: false } },
        { breakpoint: 600, settings: { slidesToShow: 1,slidesToScroll: 1, dots: false}}
      ]
    };
    
    console.log("friendsList!!!!!!!!!!", friendsList);
    let allRequests = [];
    if (this.props.friends.request.from) {
      allRequests = this.props.friends.request.from;
    }
    var uniqAllRequests = [ ...new Set(allRequests) ]; 
    // let allRequestsUniq = a => [...new Set(allRequests)];

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
      //console.log("Profile Data",profile);
      console.log("All request",allRequests);
    }
    return (    
      <div className="main-content-container container-fluid px-4">
              <div className="row mt-4">
                  <div className="col-12">
                   <div className="card card-small user-details mb-4">
                     <div className="card-header p-0 ">
                       {/* <div className="user-details_bg">
                         <img src={card}/></div>  */}
                         </div>

                        <div className="card-body p-0 profile">
                          <div className=" avtar">
                          <div className="avtarImg" style={{ backgroundImage: `url(${userImageUrl})` }}></div>
                            {/* <img src={user}></img>  */}
                          </div>
                          <Link  to={`/updateProfile`}>Edit Profile</Link>

                   

                    <h4 class="text-center m-0 mt-2">{userName}</h4>
        <p class="text-center text-dark m-0 mb-2" style={{color:"grey"}}>{userBio}</p>
        
        <div class="user-details__user-data border-top border-bottom p-4">
          <div class="row mb-3">
            <div class="col w-33">
              <span><i class="far fa-envelope"></i></span>
              <span>{userEmail}</span>
            </div>
            <div class="col w-33">
              <span><i class="fas fa-location-arrow"></i> </span>
              <span>{userAddress}</span>
            </div>
            <div class="col w-33">
              <span><i class="fas fa-birthday-cake"></i> </span>
              <span>{userBirthday}</span>
            </div>
          </div>
        </div>


        <div class="user-details__tags p-4" >
          <span class="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{color:"purple"}}>{userInterests}</span>
        
        </div>


                    </div>
                   
                   </div>
                  
                  </div>  
                  <div className="col-12">
<div className="card card-small user-details mb-4">
{/* <div className="card-header border-bottom">
  <h6 className="m-0 text-primary">Suggested Friends</h6></div> */}
 
<div className="card-body p-0">
                  {/* <div className="row">
                  <div className="col-md-12 ml-auto mr-auto"> */}
                {/* <h4 className="text-primary">Requests Received</h4>
                  <ul className="friendRequestList ">
                    {
                      allRequests && allRequests.map(data => {
                        return (
                          <li className="m-2 card border-primary ">
                            <div className=""><div class="friendAvtar text-center">
                              <div className="avtarImg" style={{ backgroundImage: `url(https://i1.sndcdn.com/avatars-000316300368-x3f9sd-t500x500.jpg)` }}></div>
                              <Link  to={`/friend/${data}`}>{data}</Link>
                              <button className="btn btn-sm btn-info btn-sm mr-2" 
                              onClick={() => {
                                this.setState({
                                  loggedUser: userEmail,
                                  requestedUser: data,
                                  msg:true
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
                  </ul> */}
               {/* </div>
               </div> */}
             
             <div className="row">
                <div className="col-md-12 ml-auto mr-auto customFriendList">
                <ul class="nav nav-tabs mb-2">
                    <li class="nav-item mr-2">
                      <a class="nav-link active" data-toggle="tab" href="#requests">Friend Reuqests</a>
                    </li>
                    <li class="nav-item mr-2">
                      <a class="nav-link" data-toggle="tab" href="#friends">Friends</a>
                    </li>
                    <li class="nav-item mr-2">
                      <a class="nav-link" data-toggle="tab" href="#suggestedFriends">Suggested Friends</a>
                    </li>
                </ul>
                  <div id="myTabContent" class="tab-content">
                    <div class="tab-pane fade  active show" id="requests">
                         <Slider {...setting}>
                              {
                                uniqAllRequests && uniqAllRequests.map(data => {
                                return (
                                  <div className="m-2 card border-primary ">
                                    <div className=""><div class="text-center">
                                      {/* <div className="avtarImg" style={{ backgroundImage: `url(https://i1.sndcdn.com/avatars-000316300368-x3f9sd-t500x500.jpg)` }}></div> */}
                                      <Link  style={{display:"block"}}to={`/friend/${data}`}>{data}</Link>
                                      <button className="btn btn-sm btn-info btn-sm mr-2"
                          onClick={() => {
                            this.setState({
                              msg: true
                            })
                            const request = ({
                              loggedUser: userEmail,
                              requestedUser: data
                            })
                            this.props.acceptFriendRequest(request)
                          }}> Accept Request</button>
                        <button className="btn btn-sm btn-primary btn-sm"
                          onClick={() => {
                            const request = ({
                              loggedUser: userEmail,
                              requestedUser: data
                            })
                            this.props.rejectFriendRequest(request)
                          }}> Reject Request</button>
                                    </div>
                                    </div>
                                  </div>
                                )
                              })   
                            }
                         </Slider>
                    </div>
                    <div class="tab-pane fade " id="friends">
                      <Slider {...setting}>
                                {
                                  friendsList && friendsList.map(data => {
                                  return (
                                    <div className="m-2 card border-primary ">
                                      <div className=""><div class="text-center">
                                        {/* <div className="avtarImg" style={{ backgroundImage: `url(https://i1.sndcdn.com/avatars-000316300368-x3f9sd-t500x500.jpg)` }}></div> */}
                                        <Link  to={`/friend/${data}`}>{data}</Link>
                                      </div>
                                      </div>
                                    </div>
                                  )
                                })   
                              }
                          </Slider>
                    </div>
                    <div class="tab-pane fade" id="suggestedFriends">
                        <Slider {...setting}>
                              {
                                profiles && profiles.map(data => {
                                  return (
                                    <div key={"profile-"+data} className="card border-primary p-2">
                                      <Link key={"profile-link-"+data.handle} to={`/friend/${data.email}`} target="_blank">
                                          <div key={"profile-container-"+data.handle} className="text-center">
                                            <div key={"profile-friendAvtar-"+data.handle} className="friendAvtar m-auto">
                                              <div key={"profile-background-"+data.handle} className="avtarImg" style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
                                            </div>
                                          </div>
                                          <h5 key={"profile-handle-"+data.handle} className="mt-2 text-primary text-center font-weight-bold">{data.handle}</h5>
                                      </Link>
                                    </div>
                                  )
                                })}
                         </Slider>
                    </div>
                  </div>
                  {/* <h4 className="text-primary">Suggested  Friends</h4> */}
                  {/* <ul className="customFriendList"> */}
                 
                  {/* </ul> */}
                </div>
                </div>

              
              {/* <div className="row">
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
                </div> */}
                <Snackbar
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        autoHideDuration={3000}
                        open={this.state.msg}
                        onClose={() => {
                            this.setState({
                                msg: false
                            });
                        }}
                    >
                        <SnackbarContent
                            style={{
                                backgroundColor: this.state.msg
                                    ? "green"
                                    : ""
                            }}
                            message={
                                this.state.msg
                                    ? "You Are Now Friends"
                                    : ""
                            }
                        />
                    </Snackbar>
              </div>
              </div>
            
          </div>
          </div>
          </div>   
    )
  }
}
const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  friends: state.friends

})
export default connect(mapStateToProps, { getAllProfiles, getProfile, getfriendRequestList, rejectFriendRequest, acceptFriendRequest, getSuggestedFrds,getFriendsList })(CreateProfile);