import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./eventDetail.css";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEventDetails,getRecmdEvents,getLocationEvents } from '../../actions/eventActions';
import { goingEvent, notGoingEvent} from '../../actions/friendActions';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "../../css/App.css";
import Spinner from '../common/Spinner'
class EventDetails extends Component {
  componentDidMount() {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        })
      });

    this.props.getRecmdEvents(this.props.match.params.title);
    this.props.getLocationEvents(this.props.match.params.title);
  }
constructor(props) {
    super(props);
    this.state = {
      eventId :'',
      user : '',
      interested: false,
      going: false
    };
    //props.getEvents();
    this.props.getEventDetails(this.props.match.params.title);
    this.interested = this.interested.bind(this);
    this.going = this.going.bind(this);
}
interested() { 
    this.setState({interested : !this.state.interested });
}
going(){
  this.setState({going : !this.state.going })
}
goingActivity = () => {
  this.props.goingEvent(this.state)
}
notGoingActivity = () => {
  this.props.notGoingEvent(this.state)
}
  render() {
    const { isAuthenticated } = this.props.auth;
    const { eventDetails, loading, recom, locationData } = this.props.eventDetails;
    const dataset  = this.props.getRecmdEvents;
    const activities =(<ul className=" track-events mt-2"><li className=""><div  className= {this.state.interested ? "interested active" : "interested"} onClick={this.interested}><div>☆</div></div></li><li className=""><div className= {this.state.going ? "going active" : "going"} onClick={this.going}><div></div></div></li></ul>);
    let showItems = 4
     const setting = {
       dots: false,
       infinite: true,
       speed: 500,
       slidesToShow: showItems,
       slidesToScroll: 1
     };
    
     if(window.innerWidth <= 576)showItems=1
     else if(window.innerWidth <= 768)showItems=2
     else if(window.innerWidth <= 1024)showItems=3
     else showItems=4

    const ShowRecommendation = (
      <div className="recommendation-section">
       <div key="recommended-events" className="recommended-events">
              <h4 key="recommended-events-heading" className="text-capitalise">Recommended Events</h4>
                <Slider {...setting}>
                {
                      recom && recom.map(data => (
                        <div key={data.title+"card-slider"} className="card card-slider">
                        {/* title= {data.title} */}
                           <div key={data.title+"-body"} className="card-body"> 
                           <Link to={`/event/${data.title}`} className="card-link">
                              <div key={data.title+"-image-container"} className="imageContainer" title="Click to see more details">
                                <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}></div>
                              </div>
                               <h5 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>{data.title}</h5>
                             </Link>
                             <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-3 mt-3   pt-0 lead float-left"><b>{data.startdate}</b></h6>
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
                        <div key={data.title+"card-slider"} className="card card-slider">
                        {/* title= {data.title} */}
                           <div key={data.title+"-body"} className="card-body"> 
                           <Link to={`/event/${data.title}`} className="card-link">
                           <div key={data.title+"-image-container"} className="imageContainer" title="Click to see more details">
                             <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}></div>
                           </div>
                             
                               <h5 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>{data.title}</h5>
                             </Link>
                             <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>{data.startdate}</b></h6>
                             {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                              <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a> 
                             {/* <a href={`https://www.google.com/maps?saddr=${this.state.locationData.lat},${this.state.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                             <div className="clear-fix"></div>
                           </div>
                         </div>                         
                  ))}
               </Slider>      
              </div>
        </div>
    )
    return (
        <div className="container pt-2">
          { eventDetails && eventDetails.map(data => {
              return(
                  <div key={data.title+"-event-detail-container"} className="event-detail-container row text-black lead">
                    <div key={data.title+"-left-container"} className="left-container col-lg-8 col-md-12 col-sm-12 col-xs-12">
                      <h3 key={data.title+"-title"}>{data.title}</h3>
                      <img key={data.title+"-image"} src={data.img}/>
                      <p className="mt-2 text-justify">{data.summary}</p>
                      </div>
                      <div key={data.title+"-right-container"} className="right-container col-lg-4 col-md-12 col-sm-12 col-xs-12 pt-5">
                        <p key={data.title+"-date"} className="mb-2"><span className="text-muted">Date:</span><p>{data.date}</p></p>
                        <p key={data.title+"-address"} className="mb-2"><span className="text-muted">Address:</span><p>{data.address}</p></p>
                        <p key={data.title+"-price"} className="mb-2"><span className="text-muted">Price:</span><p>{data.price}</p></p>
                        {/* <button className="btn btn-sm btn-info btn-sm mr-2" 
                              onClick={() => {
                                this.setState({
                                  eventId : data.title,
                                  user :  user.email
                                })
                                this.goingActivity()
                            }}>Going</button>
                        <button className="btn btn-sm btn-danger btn-sm"
                              onClick={() => {
                                this.setState({
                                  eventId : data.title,
                                  user :  user.email
                                })
                                this.notGoingActivity()
                            }}>Not Going</button> */}
                            <a key={data.title+"-link"} target="_blank" href={data.read_more} className="btn btn-primary">Visit Webpage</a>
                            {isAuthenticated? activities : "" }
                      </div>
                  </div>
                  )})}
                  {isAuthenticated  ? ShowRecommendation : ""}
            </div>
    );
    
     function triggerRefresh(){
      //refreshPage();
     }
     function refreshPage(){ 
        setTimeout(function(){  window.location.reload();},1e3); 
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
  auth: state.auth
});
export default connect(mapStateToProps, { getEventDetails,getRecmdEvents,getLocationEvents,goingEvent,notGoingEvent })(EventDetails);
