import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEventDetails } from '../../actions/eventActions';


class EventDetails extends Component {
  componentDidMount() {
    if (this.props.match.params.eventId) {
      this.props.getEventDetails(this.props.match.params.eventId);
    }
  }

  render() {
    const { eventDetails, loading } = this.props.eventDetails;
    console.log(eventDetails,"eventDetails")

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
    eventDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  eventDetails: state.events
});

export default connect(mapStateToProps, { getEventDetails })(EventDetails);
