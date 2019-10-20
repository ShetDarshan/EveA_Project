import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {getEvents} from '../../actions/eventActions';
import EventItem from './EventItem';



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
      let eventItems;
      eventItems = events.map(event =>(<EventItem key={event.eventId} event={event} /> ));
  
      return (
        <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <h1 className="display-4 text-center">Events List</h1>
              <p className="lead text-center">
                More Info on Events
              </p> */}
              {/* <Button outline color="primary" >Search Events</Button> */}
              <div class="card-columns bg-dark">
                 {eventItems}
            </div>
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
  