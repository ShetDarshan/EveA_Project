import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class EventItem extends Component {
  render() {
    const { event } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={event.img} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{event.title}</h3>
            <h3>{event.location}</h3>
            <h3>{event.price}</h3>
            <a href={event.read_more} className="btn btn-info">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}


export default EventItem;
