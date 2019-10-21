import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import GuestItem from './GuestItem';
import Carousel from 'react-bootstrap/Carousel'
import Spinner from '../dashboard/Spinner';


class Guestuser extends Component {
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

      if (eventObj.category === "HEALTH & SPORTS" && eventSports.length <= 10) {
        eventSports.push(eventObj)
      }

      else if (eventObj.category === "MUSIC & ENTERTAINMENT" && eventComedy.length <= 10) {
        eventComedy.push(eventObj)
      }
      else if (eventObj.category === "COMMUNITY & FESTIVALS" && eventFestivals.length <= 10) {
        eventFestivals.push(eventObj)
      }
      else if (eventObj.category === "FASHION,ART & THEATRE" && eventFashion.length <= 10) {
        eventFashion.push(eventObj)
      }

      else if (eventObj.category === "EDUCATION,BUSINESS & TECHNOLOGY" && eventEducation.length <= 10) {
        eventEducation.push(eventObj)
      }



    })

    let eveSports = eventSports.map(event => (<GuestItem key={event.eventId} event={event} />));
    let eveComedy = eventComedy.map(event => (<GuestItem key={event.eventId} event={event} />));
    let eveFestivals = eventFestivals.map(event => (<GuestItem key={event.eventId} event={event} />));
    let eveEducation = eventEducation.map(event => (<GuestItem key={event.eventId} event={event} />));
    let eveFashion = eventFashion.map(event => (<GuestItem key={event.eventId} event={event} />));

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <Carousel>
                  <Carousel.Item style={{ height: '350px' }}>
                    <img
                      className="d-block w-100"
                      src={require('./../../img/music.jpg')}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Music Events</h3>
                      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{ height: '350px' }}>
                    <img
                      className="d-block w-100"
                      src={require('./../../img/sports.jpg')}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Sports Events</h3>
                      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{ height: '350px' }}>
                    <img
                      className="d-block w-100"
                      src={require('./../../img/music.jpg')}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Cultural Events</h3>
                      {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>

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

export default connect(mapStateToProps, { getEvents })(Guestuser);
