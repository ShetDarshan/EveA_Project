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
    this.props.getRecmdEvents(this.props.match.params.title);
    this.props.getLocationEvents(this.props.match.params.title);
  }
constructor(props) {
    super(props);
    this.state = {
      eventId :'',
      user : '',
      condition: false
    };
    //props.getEvents();
    this.props.getEventDetails(this.props.match.params.title);
}
toggle() {
  this.setState({
    condition : !this.state.condition
  });
  console.log(this.state.condition);  
}
goingActivity = () => {
  this.props.goingEvent(this.state)
  console.log(this.state);
}
notGoingActivity = () => {
  this.props.notGoingEvent(this.state)
  console.log(this.state);
}
  render() {
    let interested = ["interested"];
    if(this.state.addClass) {
      interested.push('interested');
    }
    const { eventDetails, loading, recom, locationData } = this.props.eventDetails;
    const dataset  = this.props.getRecmdEvents;
    const { user } = this.props.auth;
      // console.log("Recommendation",recom);
      // console.log("locationData",locationData);
      console.log(typeof recom )
    if (recom === undefined || Object.keys(recom).length < 1  ){
     console.log(" %c Loading the data from ajax" ,"background-color:#fff; color :#000;");
      return <div><Spinner /></div>
    } 
    else {
     //console.log("dataset",dataset);
     let showItems = 4

    if(window.innerWidth <= 576)showItems=1
    else if(window.innerWidth <= 768)showItems=2
    else if(window.innerWidth <= 1024)showItems=3
    else showItems=4
     const setting = {
       dots: false,
       infinite: true,
       speed: 500,
       slidesToShow: showItems,
       slidesToScroll: 1
     };
     function triggerRefresh(){
      //refreshPage();
     }
     function refreshPage(){ 
      setTimeout(function(){  window.location.reload();},1e3); 
      }
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
                        <h3 key={data.title+"-category"} className="mb-2">Category:</h3><p className="card-text mb-2"> {data.category}</p>
                        <h3 key={data.title+"-date"} className="mb-2">Date:</h3><p className="card-text mb-2">{data.date}</p>
                        <h3 key={data.title+"-address"} className="mb-2">Address:</h3><p className="card-text mb-2">{data.address}</p>
                        <h3 key={data.title+"-price"} className="mb-2">Price:</h3> <p className="card-text mb-2">{data.price}</p>
                        {/* <a key={data.title+"-link"} target="_blank" href={data.read_more} className="btn btn-primary">Event Details</a> */}
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
                            <ul className=" track-events">
                              <li>
                              <a key={data.title+"-link"} target="_blank" href={data.read_more} className="btn btn-primary">Event Details</a>
                              </li>
                                <li className="">
                                    <div className= {this.state.condition ? "interested active" : "interested" }
                                          onClick={this.toggle.bind(this)}>
                                        <div>☆</div>
                                    </div>
                                </li>
                                <li className="">
                                        <div className= {this.state.condition ? "going active" : "going" }
                                              onClick={this.toggle.bind(this)}>
                                        <div></div>
                                    </div>
                                </li>
                              </ul>
                            <div>data:{data.title} <span>Email:{user.email}</span></div>
                            
                            
                            
                      </div>
                  </div>
                  )})}
                  <div key="recommended-events" className="recommended-events">
                  <h4 key="recommended-events-heading" className="text-capitalise">Recommended Events</h4>
                    {/* <Slider {...setting}>
                    {
                          recom && recom.map(data => (
                                  <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                        <div key={data.title+"-body"} className="card-body text-white"  > 
                                        <Link to={`/event/${data.title}`} className="card-link">
                                        <div key={data.title+"-image-container"} className="imageContainer" onClick = {triggerRefresh}>
                                          <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}></div>
                                        </div>
                                        
                                          <h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0  " style={{paddingTop:"50px"}}>{data.title}</h6>
                                          </Link>
                                          <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 mt-2 pt-0 text-primary"><b>Date: </b>{data.startdate}</h6>
                                          <Link to={`/event/${data.title}`} className="card-link" onClick={ refreshPage }>
                                                 View Event
                                         </Link>
                                          <a href={"https://maps.google.com/?q="+ data.latitude +","+ data.longitude } target="_blank" className="card-link">View Map</a>
                                        </div>
                                      </div>                                
                            
                      ))}
                   </Slider>       */}
                  </div>
                  <div key="nearby-events" className="nearby-events">
                  <h4 key="nearby-events-heading" className="text-capitalise">Nearby Events</h4>
                    <Slider {...setting}>
                    {
                          locationData && locationData.map(data => (
                                  <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                        <div key={data.title+"-body"} className="card-body text-white"  > 
                                        <div key={data.title+"-image-container"} className="imageContainer" >
                                          <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}></div>
                                        </div>
                                        <Link to={`/event/${data.title}`} className="card-link" >
                                          <h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0 " style={{paddingTop:"50px"}}>{data.title}</h6>
                                          </Link>
                                          <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 mt-2 pt-0 text-primary"><b>Date: </b>{data.startdate}</h6>
                                          <Link to={`/event/${data.title}`} className="card-link" onClick={ refreshPage } >
                                                 View Event
                                         </Link>
                                          <a href={"https://maps.google.com/?q="+ data.latitude +","+ data.longitude } target="_blank" className="card-link">View Map</a>
                                        </div>
                                      </div>                                
                      ))}
                   </Slider>      
                  </div>
            </div>
    );
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
