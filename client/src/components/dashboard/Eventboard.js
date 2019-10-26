import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import EventItem from './EventItem';
import Carousel from 'react-bootstrap/Carousel'
import Spinner from '../dashboard/Spinner';


class Eventboard extends Component {
  componentDidMount() {
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
    let eventFestivals = [];
    let eventFashion = [];
    let eventEducation = [];


    events.forEach(element => {
      let eventObj = {};
      eventObj = element;
      let cat = eventObj.category

      if (eventObj.category === "HEALTH & SPORTS" && eventSports.length <= 11) {
        eventSports.push(eventObj)
      }

      else if (eventObj.category === "MUSIC & ENTERTAINMENT" && eventComedy.length <= 11) {
        eventComedy.push(eventObj)
      }
      else if (eventObj.category === "COMMUNITY & FESTIVALS" && eventFestivals.length <= 11) {
        eventFestivals.push(eventObj)
      }
      else if (eventObj.category === "FASHION,ART & THEATRE" && eventFashion.length <= 11) {
        eventFashion.push(eventObj)
      }

      else if (eventObj.category === "EDUCATION,BUSINESS & TECHNOLOGY" && eventEducation.length <= 11) {
        eventEducation.push(eventObj)
      }



    })

    let eveSports = eventSports.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveComedy = eventComedy.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveFestivals = eventFestivals.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveEducation = eventEducation.map(event => (<EventItem key={event.eventId} event={event} />));
    let eveFashion = eventFashion.map(event => (<EventItem key={event.eventId} event={event} />));

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              {/* <div className="card card-body bg-light mb-3"> */}
              <div style={{ background: "white", color: "black", marginLeft: "20px", marginRight: "54px" }}>
                <h3 className="display-4 text-left">Music and Entertainment</h3>
                <div className="card-deck">
                  {eveComedy}
                </div>
              </div>
              <hr></hr>
              <div style={{ background: "white", color: "black", marginLeft: "20px", marginRight: "54px" }}>
                <h3 className="display-4 text-left">Community and Festivals</h3>
                <div className="card-deck">
                  {eveFestivals}
                </div>
              </div>

              <hr></hr>
              <div style={{ background: "white", color: "black", marginLeft: "20px", marginRight: "54px" }}>
                <h3 className="display-4 text-left">Education Business and Technology</h3>
                <div className="card-deck">
                  {eveEducation}
                </div>
              </div>
              <hr></hr>
              <div style={{ background: "white", color: "black", marginLeft: "20px", marginRight: "54px" }}>
                <h3 className="display-4 text-left">Fashion and Art</h3>
                <div className="card-deck">
                  {eveFashion}
                </div>
              </div>
              <hr></hr>
              <div style={{ background: "white", color: "black", marginLeft: "20px", marginRight: "54px" }}>
                <h3 className="display-4 text-left">Sports and Health</h3>
                <div className="card-deck" >
                  {eveSports}
                </div>
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

export default connect(mapStateToProps, { getEvents })(Eventboard);
