import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import EventItem from '../eventItems/EventItem';
import "../../css/bootstrap.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Carousel from "../../../node_modules/react-bootstrap/Carousel"
//import Carousel from 'react-bootstrap/Carousel'

class Eventboard extends Component {
  componentDidMount() {
    console.log("inside in getevents")
    this.props.getEvents();
  }
  constructor(props) {
    super(props);
    this.state = {lat:"",lon:""};
    props.getEvents();
    this.state={
      showMe:true
    }
  }

  operation(){

    this.setState({
      showMe:!this.state.showMe
    })
  }

  render() {  
    const { events } = this.props.events;
    console.log(events);
    let eventSports = [];
    let eventComedy = [];
    let eventFestivals = [];
    let eventFashion = [];
    let eventEducation = [];

    events.forEach(element => {
      let eventObj = {};
      eventObj = element;

      if (eventObj.category === "HEALTH & SPORTS" && eventSports.length <= 11) {
        eventSports.push(eventObj)
      } else if (eventObj.category === "MUSIC & ENTERTAINMENT" && eventComedy.length <= 11) {
        eventComedy.push(eventObj)
      } else if (eventObj.category === "COMMUNITY & FESTIVALS" && eventFestivals.length <= 11) {
        eventFestivals.push(eventObj)
      } else if (eventObj.category === "FASHION,ART & THEATRE" && eventFashion.length <= 11) {
        eventFashion.push(eventObj)
        
        
        
        {
          this.state.showMe?
  <Slider {...settings}>
  {
    dataset[categoriesList].map(data => (
      <div key={data.title+"card-slider"} className="card card-slider"  title= {data.title}>
        
            <div key={data.title+"-body"} className="card-body"  > 
            
            
            <br></br>

            <div key={data.title+"-image-container"} className="imageContainer" >
              <div key={data.title+"-background"} className="imageBg" 
              style={{backgroundImage: `url(${data.img})`,width:"255px",height:"160px"}}>
            </div>
            </div><br></br>
            
<Link to={`/event/${data.title}`} className="card-link" style={{color:"white"}}>
<h4 style={{color:"white"}} key={data.title+"-desc"} title= {data.title} className="card-title" 
style={{paddingTop:"50px", textAlign:"left"}}>{data.title}</h4>
</Link> <br></br>

                                
              <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`}
               target="_blank" className="card-link"><i class="fas fa-map-marker text-muted float-right fa-lg p-1 my-1" 
               data-toggle="tooltip" data-placement="top" title="See Location"></i></a>
                    <i class="fas fa-heart text-muted float-right p-1 my-1 mr-3" data-toggle="tooltip" data-placement="top" title="I like it"></i>

              <h6 style={{textAlign:"left"}} key={data.startdate+"-startdate"} ><i className="far fa-calendar float-left fa-lg" ></i>{data.startdate}</h6>
</div>

            </div>
          
    ))}
    </Slider>
    
    :null
  }





      } else if (eventObj.category === "EDUCATION,BUSINESS & TECHNOLOGY" && eventEducation.length <= 11) {
        eventEducation.push(eventObj)
      }

    })

    let eveSports = eventSports.map(event => (<EventItem key={event.eventId} event={event} />));


    let eveComedy = eventComedy.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveFestivals = eventFestivals.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveEducation = eventEducation.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveFashion = eventFashion.map(event => (<EventItem key={event.eventId} event={event} />));


    
  
    return (<div className="eventDashboard">
      
    </div>);
  }
}



const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps, { getEvents })(Eventboard);
