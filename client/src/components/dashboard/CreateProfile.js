import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile, updateProfile, getSuggestedFrds } from '../../actions/profileActions';
import { getfriendRequestList, acceptFriendRequest, rejectFriendRequest } from '../../actions/friendActions';

import "../../css/profile.css";
import firebase from 'firebase';
import noPic from '../../img/noPic.jpg';
import { isNull } from 'util';
import { Link } from 'react-router-dom';
import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
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
    const profile = this.props.getProfile(user.email);
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
    // var { request  } =  this.props.friends;
    console.log("suggested", sugessted);
    let allRequests = [];
    if (this.props.friends.request.from) {
      allRequests = this.props.friends.request.from;
    }

    // console.log("this.props.friends.request.from",this.props.friends.request.from);
    // console.log("console request", allRequests);

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


      <div className="main-content-container container-fluid px-4">

        <div className="row mt-4">

          <div className="col-sm-12 col-lg-4">
            <div className="card card-small user-details mb-4">
              <div className="card-header p-0">
                <div className="user-details_bg">
                  <img src={card} /></div>
              </div>
              <div className="card-body p-0">
              
                <div className="user-details__avatar mx-auto">
                  {/* <div className="avtarImg" style={{ backgroundImage: `url(${userImageUrl})` }}></div> */}
                  
                  <img src={user}></img>
                
                </div>

                <h4 className="text-center m-0 mt-2">{userName}</h4>
                <p className="text-center text-light m-0 mb-2" style={{ color: "black" }}>{userBio}</p>

                <button type="button" class="btn btn-primary btn-lg btn-block" style={{backgroundColor:"#ffbb33",borderBlockColor:"#ffbb33"}} data-toggle="modal" data-target=".bd-example-modal-lg1">
  Interested events
</button>
<button type="button" class="btn btn-primary btn-lg btn-block" style={{backgroundColor:"#593196"}} data-toggle="modal" data-target=".bd-example-modal-lg2">
  Going events
</button>

                <div className="user-details__user-data border-top border-bottom p-4">
                  <div className="row mb-3">
                    <div className="col w-50">
                      <span>Email</span>
                      <span>sierra@example.com</span>
                    </div>
                    <div className="col w-50">
                      <span>Location</span>
                      <span>Remote</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col w-50">
                      <span>Phone</span>
                      <span>+40 1234 567 890</span>
                    </div>
                    <div className="col w-50">
                      <span>Account Number</span>
                      <span>123456789</span>
                    </div>
                  </div>
                </div>
                <div className="user-details__tags p-4" >
                  <span className="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{ color: "black" }}>User Experience</span>
                  <span className="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{ color: "black" }}>UI Design</span>
                  <span className="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{ color: "black" }}>React JS</span>
                  <span className="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{ color: "black" }}>HTML &amp; CSS</span>
                  <span className="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{ color: "black" }}>JavaScript</span>
                  <span className="badge badge-pill badge-light text-light text-uppercase mb-2 border" style={{ color: "black" }}>Bootstrap 4</span>
                </div>












              </div>

            </div>

          </div>

          <section id="Interested events">
          <div class="container">

{/* <ul class="nav nav-pills nav-stacked">
  <li><a href="#lightbox" data-toggle="modal">Open Lightbox</a></li>
</ul> */}

{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg1">View all</button> */}


{/* <div class="modal fade bd-example-modal-lg and carousel slide" id="lightbox"> */}
<div class="modal fade bd-example-modal-lg1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Interested events</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
      <div class="container-fluid">
    <div id="carouselExample" class="carousel slide" data-ride="carousel" data-interval="9000">
        <div class="carousel-inner row w-100 mx-auto" role="listbox">
            <div class="carousel-item col-md-4 active">
              <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
            <i class="fa fa-chevron-left fa-lg text-muted"></i>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next text-faded" href="#carouselExample" role="button" data-slide="next">
            <i class="fa fa-chevron-right fa-lg text-muted"></i>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>





     <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>   
        
      </div>
    </div>
  </div>
</div>

</div>
    </section>



    <section id="Going events">
          <div class="container">

{/* <ul class="nav nav-pills nav-stacked">
  <li><a href="#lightbox" data-toggle="modal">Open Lightbox</a></li>
</ul> */}

{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg2">View all</button> */}


{/* <div class="modal fade bd-example-modal-lg and carousel slide" id="lightbox"> */}
<div class="modal fade bd-example-modal-lg2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Going events</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
      <div class="container-fluid">
    <div id="carouselExample" class="carousel slide" data-ride="carousel" data-interval="9000">
        <div class="carousel-inner row w-100 mx-auto" role="listbox">
            <div class="carousel-item col-md-4 active">
              <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
            <div class="carousel-item col-md-4">
            <div class="card card-slider">
            <div className="card-body"> 
                                    <Link to="https://towardsdatascience.com/recommender-system-a1e4595fc0f0" className="card-link">
                                      <div className="imageContainer" title="Click to see more details">
                                      <div className="imageBg" style={{backgroundImage: "ttps://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwik1aqSoJrmAhXDiFwKHXgjAV8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ecommercetimes.com%2Fstory%2F86230.html&psig=AOvVaw2cwwaIym-8Af6tZt3NIuCJ&ust=1575489031592418"}}></div>
                                    </div>
                                    <h5 title= "hyu event" className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>hyu event</h5>
                                  </Link>
                                  <h6 className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>03.05.2019</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   {/* <a href={`https://www.google.com/maps?saddr=$66.77,${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>  */}
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
            <i class="fa fa-chevron-left fa-lg text-muted"></i>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next text-faded" href="#carouselExample" role="button" data-slide="next">
            <i class="fa fa-chevron-right fa-lg text-muted"></i>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>





     <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>   
        
      </div>
    </div>
  </div>
</div>

</div>
    </section>





          <div className="w-25">
            <h4 className="text-primary">Requests Received</h4>
            <ul classNameName="friendRequestList ">
              {
                allRequests && allRequests.map(data => {
                  return (
                    <li className="m-2 card border-primary ">
                      <div className=""><div className="friendAvtar text-center">
                        <div className="avtarImg" style={{ backgroundImage: `url(https://i1.sndcdn.com/avatars-000316300368-x3f9sd-t500x500.jpg)` }}></div>
                        <Link to={`/friend/${data}`}>{data}</Link>
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
                    </li>
                  )
                })
              }
            </ul>
          </div>
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

                // sugessted && sugessted.map((e,i )=>{ e.map((f,j)=> {console.log(f.email,"final")})}) 

                sugessted && sugessted.map((data, i) => {
                  return (data.map((f, j) => {
                    return (

                      <li key={"profile-" + f} className="card border-primary m-2 p-2">
                        <Link key={"profile-link-" + f.handle} to={`/friend/${f.email}`}>
                          <div key={"profile-container-" + f.handle} className="text-center">
                            <div key={"profile-friendAvtar-" + f.handle} className="friendAvtar m-auto">
                              <div key={"profile-background-" + f.handle} className="avtarImg" style={{ backgroundImage: `url(${f.imageUrl})` }}></div>
                            </div>
                          </div>
                          <h5 key={"profile-handle-" + f.handle} className="mt-2 text-primary text-center font-weight-bold">{f.handle}</h5>
                        </Link>
                      </li>
                    )
                  }
                  ))
                })


                /* {
     sugessted && sugessted.map(data,i => {
     
       return (

         <li key={"profile-"+data} className="card border-primary m-2 p-2">
           <Link key={"profile-link-"+data.handle} to={`/friend/${data[i].email}`}>
               <div key={"profile-container-"+data[i].handle} className="text-center">
                 <div key={"profile-friendAvtar-"+data[i].handle} className="friendAvtar m-auto">
                   <div key={"profile-background-"+data[i].handle} className="avtarImg" style={{ backgroundImage: `url(${data[i].imageUrl})` }}></div>
                 </div>
               </div>
               <h5 key={"profile-handle-"+data[i].handle} className="mt-2 text-primary text-center font-weight-bold">{data[i].handle}</h5>
           </Link>
         </li>
       )
     })} */
              }

            </ul>
          </div>
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



    )
  }
}
const mapStateToProps = state => ({
  //getting the user list from profileReducer and auth from authReducer
  users: state.users,
  auth: state.auth,
  friends: state.friends

})
export default connect(mapStateToProps, { getAllProfiles, getProfile, getfriendRequestList, rejectFriendRequest, acceptFriendRequest, getSuggestedFrds })(CreateProfile);