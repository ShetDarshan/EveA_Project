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
    this.state = { };
    props.getEvents();
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
