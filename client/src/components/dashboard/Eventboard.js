import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {getEvents} from '../../actions/eventActions';
import EventItem from './EventItem';
import Carousel from 'react-bootstrap/Carousel'


class Eventboard extends Component {
  componentDidMount(){
    console.log("inside in getevents")
    this.props.getEvents();
  }

constructor(props) {
    super(props);
    this.state = {
    };
    props.getEvents();
}
    render() {
      const { events } = this.props.events;
      let eventSports = [];
      let eventComedy = [];

      let i =0;

      
      events.forEach(element => {
        let eventObj = {};
        eventObj = element;
        let cat  = eventObj.category
        console.log(cat,"category data")
        
        if(eventObj.category === "HEALTH & SPORTS" && eventSports.length <= 10){
          eventSports.push(eventObj)
        }

        else if(eventObj.category === "MUSIC & ENTERTAINMENT" && eventComedy.length <= 10){
          eventComedy.push(eventObj)
        }
      })

      console.log(eventSports,"eventSports");
      console.log(eventComedy,"eventComedy");
     let eveSports=eventSports.map(event =>(<EventItem key={event.eventId} event={event} /> ));
     let eveComedy=eventComedy.map(event =>(<EventItem key={event.eventId} event={event}  /> ));
   console.log(eveComedy,"comedy");

      return (
        <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Events List</h1>
              <p className="lead text-center">
                More Info on Events
              </p>
         
              {/* <div className="card card-body bg-light mb-3"> */}
              <h1 className="display-4 text-center">Sports and Health Events List</h1>
                <div className="card-columns"> 
                {eveSports}
                </div>
                <h1 className="display-4 text-center">Music Events List</h1>
                <div className="card-columns">
                {eveComedy}
                </div>
                 
            {/* </div> */}
          </div>
        </div>
      </div>
      </div>
      );
    }
  }
  
  
  const mapStateToProps = state => ({
    events: state.events
  });
  
  export default connect(mapStateToProps,{getEvents})(Eventboard);
  