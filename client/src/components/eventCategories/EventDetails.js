import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./eventDetail.css";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEventDetails, getRecmdEvents, getLocationEvents } from '../../actions/eventActions';
import { goingEvent, interestedEvent ,friendsGoing } from '../../actions/friendActions';
import { getProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "../../css/App.css";
import Spinner from '../common/Spinner'
import { concat } from "bytebuffer";
let  profiles ,newGoing =[];
class EventDetails extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
    });
    let details = {
      eventId : this.props.match.params.title,
      user :  this.props.auth.user.email
    } 
    this.props.friendsGoing(details);
    this.props.getRecmdEvents(this.props.match.params.title);
    this.props.getLocationEvents(this.props.match.params.title);
  }
  myFriendsGoing(){
    newGoing = this.props.friends.friendsGoing;
    //console.log( this.props.getProfile(friend));
    newGoing.forEach(friend => {
      this.props.getProfile(friend);
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      user: '',
      interested: false,
      going: false
    };
    //props.getEvents();
    this.props.getEventDetails(this.props.match.params.title)
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { eventDetails, loading, recom, locationData } = this.props.eventDetails;
    const dataset = this.props.getRecmdEvents;
    newGoing = this.props.friends.friendsGoing;
    const profile = this.props.users.profile;
    //profile && finalList.push(profile)
    // if ( profile ) {
    //   //if(!profile.email.includes(finalList))
    //   finalList.push(profile)
    // }
    // console.log("OutsideFunc Profile",finalList)
    // if(newGoing){
    //   newGoing.forEach(element => {
    //     if(!friendsGoingList.includes(element)) {
    //       friendsGoingList.push(element)
    //     }
    //   });
    // }
    const activities = (<div><ul className=" track-events mt-2">
      <li className="">
      <div className={this.state.interested ? "interested active" : "interested"} 
        	onClick={ () => {
            this.setState({ interested: !this.state.interested })
            const request = {
              eventId : this.props.match.params.title,
              user :  this.props.auth.user.email
            }
            this.props.interestedEvent(request)
          }}>
        <div title = "Interested">☆</div>
      </div>  
      </li>
      <li className=""><div className={this.state.going ? "going active" : "going"} 
        	onClick={ () => {
            this.setState({ going: !this.state.going })
            const request = {
              eventId : this.props.match.params.title,
              user :  this.props.auth.user.email
            }
            this.props.goingEvent(request)
          }}>
        <div title = "Going"></div></div>
      </li>
      <li className=""><div 
        	onClick={ () => {
            this.myFriendsGoing()
          }}>
        <div data-toggle="modal" data-target="#friendsGoing">Friends Going</div></div>
      </li></ul>
      <div className="modal fade" id="friendsGoing" role="dialog" aria-labelledby="friendsGoingList" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title"> Your Friends who are going</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <ul className="customFriendList">
              {

                // sugessted && sugessted.map((e,i )=>{ e.map((f,j)=> {console.log(f.email,"final")})}) 

                newGoing && newGoing.map((data, i) => {
                    return (

                      <li key={"profile-" + data} className=" m-2 p-2">
                        <Link key={"profile-link-" +data} target="_black" to={`/friend/${data}`}>
                          {/* <div key={"profile-container-" + f.handle} className="text-center">
                            <div key={"profile-friendAvtar-" + f.handle} className="friendAvtar m-auto">
                              <div key={"profile-background-" + f.handle} className="avtarImg" style={{ backgroundImage: `url(${f.imageUrl})` }}></div>
                            </div>
                          </div> */}
                          <h5 key={"profile-handle-" +data} className="mt-2 text-primary text-center font-weight-bold">{data}</h5>
                        </Link>
                      </li>
                    )
                  })
              }
               </ul>    
                </div>
              </div>
          </div>
        </div>
      </div>);
    let showItems = 4
    const setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: false} },
        {breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 1, dots: false } },
        { breakpoint: 600, settings: { slidesToShow: 1,slidesToScroll: 1, dots: false}}
      ]
    };

    const ShowRecommendation = (
      <div className="recommendation-section">
        <div key="recommended-events" className="recommended-events">
          <h4 key="recommended-events-heading" className="text-capitalise">Recommended Events</h4>
          <Slider {...setting}>
            {
              recom && recom.map(data => (
                <div key={data.title + "card-slider"} className="card card-slider">
                  {/* title= {data.title} */}
                  <div key={data.title + "-body"} className="card-body">
                    <Link to={`/event/${data.title}`} className="card-link" onClick={()=>{ setTimeout(function () { window.location.reload(); }, 1e3);}}>
                      <div key={data.title + "-image-container"} className="imageContainer" title="Click to see more details">
                        <div key={data.title + "-background"} className="imageBg" style={{ backgroundImage: `url(${data.img})` }}></div>
                      </div>
                      <h5 key={data.title + "-desc"} title={data.title} className="card-title mb-2 mt-2 pt-0 lead " style={{ paddingTop: "50px" }}>{data.title}</h5>
                    </Link>
                    <h6 key={data.startdate + "-startdate"} className="card-subtitle mb-3 mt-3   pt-0 lead float-left"><b>{data.startdate}</b></h6>
                    <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>
                    <div className="clear-fix"></div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div key="nearby-events" className="nearby-events">
          <h4 key="nearby-events-heading" className="text-capitalise">Nearby Events</h4>
          <Slider {...setting}>
            {
              locationData && locationData.map(data => (
                <div key={data.title + "card-slider"} className="card card-slider">
                  {/* title= {data.title} */}
                  <div key={data.title + "-body"} className="card-body">
                    <Link to={`/event/${data.title}`} className="card-link" onClick={()=>{ setTimeout(function () { window.location.reload(); }, 1e3);}}>
                      <div key={data.title + "-image-container"} className="imageContainer" title="Click to see more details">
                        <div key={data.title + "-background"} className="imageBg" style={{ backgroundImage: `url(${data.img})` }}></div>
                      </div>

                      <h5 key={data.title + "-desc"} title={data.title} className="card-title mb-2 mt-2 pt-0 lead " style={{ paddingTop: "50px" }}>{data.title}</h5>
                    </Link>
                    <h6 key={data.startdate + "-startdate"} className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>{data.startdate}</b></h6>
                    {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                    <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a>
                    {/* <a href={`https://www.google.com/maps?saddr=${this.state.locationData.lat},${this.state.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                    <div className="clear-fix"></div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div>

        </div>
      </div>
    )
    return (
      <div className="container pt-2">
        {eventDetails && eventDetails.map(data => {
          return (
            <div key={data.title + "-event-detail-container"} className="event-detail-container row text-black lead">
              <div key={data.title + "-left-container"} className="left-container col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <h3 key={data.title + "-title"}>{data.title}</h3>
                <img key={data.title + "-image"} src={data.img} />
                <p className="mt-2 text-justify">{data.summary}</p>
              </div>
              <div key={data.title + "-right-container"} className="right-container col-lg-4 col-md-12 col-sm-12 col-xs-12 pt-5">
                <p key={data.title + "-date"} className="mb-2"><span className="text-muted">Date:</span><p>{data.startdate}</p></p>
                <p key={data.title + "-address"} className="mb-2"><span className="text-muted">Address:</span><p>{data.address}</p></p>
                <p key={data.title + "-price"} className="mb-2"><span className="text-muted">Price:</span><p>{data.price}</p></p>

                <a key={data.title + "-link"} target="_blank" href={data.read_more} className="btn btn-primary">Visit Webpage</a>

                {isAuthenticated ? activities : ""}
              </div>
            </div>
          )
        })}
        {isAuthenticated ? ShowRecommendation : ""}
      </div>
    );

    function refreshPage() {
      console.log("Refresh P")
      setTimeout(function () { window.location.reload(); }, 1e3);
    }

  }
}
EventDetails.propTypes = {
  getEventDetails: PropTypes.func.isRequired,
  eventDetails: PropTypes.object.isRequired,
  recom: PropTypes.object.isRequired,
  locationData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  eventDetails: state.events,
  recom: state.events,
  locationData: state.events,
  auth: state.auth,
  friends : state.friends,
  users: state.users,
});
export default connect(mapStateToProps, { getEventDetails, getRecmdEvents, getLocationEvents, goingEvent, interestedEvent, friendsGoing,getProfile })(EventDetails);
