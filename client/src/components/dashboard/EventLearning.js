import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import MapContainer from './MapContainer';


class EventLearning extends Component {
  render() {
    const { learn } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={learn.img} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{learn.title}</h3>
            <h3>{learn.location}</h3>
            <h3>{learn.price}</h3>
            <a href={learn.read_more} className="btn btn-info">Read More</a>
            {/* <MapContainer
              lat={+learn.latitude}
              long={+learn.longitude}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}


export default EventLearning;