import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEventDetails,getRecmdEvents } from '../../actions/eventActions';


class EventDetails extends Component {
  componentDidMount() {
    if (this.props.match.params.title) {
      this.props.getEventDetails(this.props.match.params.title);
    }
    if ( this.props.match.params.title){
        this.props.getRecmdEvents(this.props.match.params.title);
        console.log("entering here")
    }
  }

  render() {
    const { eventDetails, loading,recom } = this.props.eventDetails;
    console.log(recom,"recom")
    console.log(eventDetails);
    return (
        <div className="container">
          
          { eventDetails && eventDetails.map(data => {
              return(
                  <div className="event-detail-container">
                    <div className="left-container col-lg-8">
                      <h4>{data.title}</h4>
                      <img src={data.img}/>
                      <p>{data.summary}</p>
                      </div>
                      <div className="right-container col-lg-4">
                      </div>
                  </div>
                  ) 
    })
          }      
            </div>
    );
  }
}

EventDetails.propTypes = {
    getEventDetails: PropTypes.func.isRequired,
    eventDetails: PropTypes.object.isRequired,
    recom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  eventDetails: state.events,
  recom: state.events
});

export default connect(mapStateToProps, { getEventDetails,getRecmdEvents })(EventDetails);
