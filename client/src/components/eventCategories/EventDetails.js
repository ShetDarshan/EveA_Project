import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEventDetails,getRecmdEvents } from '../../actions/eventActions';


class EventDetails extends Component {
//   componentDidMount() {
//     if (this.props.match.params.title) {
//       this.props.getEventDetails(this.props.match.params.title);
//     }
//     if ( this.props.match.params.title){
//         this.props.getRecmdEvents(this.props.match.params.title);
//         console.log("entering here")
//     }
//   }
constructor(props) {
    super(props);
    this.props.getEventDetails(this.props.match.params.title);
    this.props.getRecmdEvents(this.props.match.params.title);
}
  render() {
    const { eventDetails, loading,recom } = this.props.eventDetails;
    console.log(recom,"recom")

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
    recom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  eventDetails: state.events,
  recom: state.events
});

export default connect(mapStateToProps, { getEventDetails,getRecmdEvents })(EventDetails);
