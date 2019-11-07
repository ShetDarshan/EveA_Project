import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEventDetails,getRecmdEvents,getLocationEvents } from '../../actions/eventActions';


class EventDetails extends Component {
constructor(props) {
    super(props);
    this.props.getEventDetails(this.props.match.params.title);
    this.props.getRecmdEvents(this.props.match.params.title);
    this.props.getLocationEvents(this.props.match.params.title);
}
  render() {
    const { eventDetails, loading,recom,locationData } = this.props.eventDetails;
    console.log(locationData,"locationdata")

    return (
      <div className="eventDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
          { eventDetails && eventDetails.map(data => {
              return(
                  <div>
                  {data.title}
                  <img src={data.img}
                  />
                  </div>
                  )
                     
    })
          }      
            </div>
          </div>
        </div>
      </div>
    );
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
  locationData: state.events
  
});

export default connect(mapStateToProps, { getEventDetails,getRecmdEvents,getLocationEvents })(EventDetails);
