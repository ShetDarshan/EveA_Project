import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {getEvents} from '../../actions/eventActions';
import GuestItem from './GuestItem';
import Carousel from 'react-bootstrap/Carousel'
import Spinner from '../dashboard/Spinner';


class Guestuser extends Component {
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
      const { events} = this.props.events;
      let eventSports = [];
      let eventComedy = [];
      let eventFestivals = [];
      let eventFashion = [];
      let eventEducation = [];

     
      events.forEach(element => {
        let eventObj = {};
        eventObj = element;
        let cat  = eventObj.category
        
        if(eventObj.category === "HEALTH & SPORTS" && eventSports.length <= 10){
          eventSports.push(eventObj)
        }

        else if(eventObj.category === "MUSIC & ENTERTAINMENT" && eventComedy.length <= 10){
          eventComedy.push(eventObj)
        }
        else if(eventObj.category === "COMMUNITY & FESTIVALS" && eventFestivals.length <= 10){
          eventFestivals.push(eventObj)
        }
        else if(eventObj.category === "FASHION,ART & THEATRE" && eventFashion.length <= 10){
          eventFashion.push(eventObj)
        }

        else if(eventObj.category === "EDUCATION,BUSINESS & TECHNOLOGY" && eventEducation.length <= 10){
          eventEducation.push(eventObj)
        }
        

        
      })

    let  eveSports=eventSports.map(event =>(<GuestItem key={event.eventId} event={event} /> ));
     let eveComedy=eventComedy.map(event =>(<GuestItem key={event.eventId} event={event}  /> ));
     let eveFestivals=eventFestivals.map(event =>(<GuestItem key={event.eventId} event={event}  /> ));
     let eveEducation=eventEducation.map(event =>(<GuestItem key={event.eventId} event={event}  /> ));
     let eveFashion=eventFashion.map(event =>(<GuestItem key={event.eventId} event={event}  /> ));
    
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
              <h3 className="display-4 text-left">Sports and Health</h3>
                <div className="card-columns"> 
                {eveSports}
                </div>
                <h3 className="display-4 text-left">Music and Entertainment</h3>
                <div className="card-columns">
                {eveComedy}
                </div>
                <h3 className="display-4 text-left">Community and Festivals</h3>
                <div className="card-columns">
                {eveFestivals}
                </div>
                <h3 className="display-4 text-left">Education Business and Technology</h3>
                <div className="card-columns">
                {eveEducation}
                </div>
                <h3 className="display-4 text-left">Fashion and Art</h3>
                <div className="card-columns">
                {eveFashion}
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
  
  export default connect(mapStateToProps,{getEvents})(Guestuser);
  