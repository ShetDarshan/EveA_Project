import React from 'react';
import PropTypes from 'prop-types';

const Card = ({property}) => {
    const {index, image, title, location} = property;
    return (
        <div id={`card-${index}`} className="card">
            <div className="overflow">
            <img src={image} className="class-img-top" style={{height:"600", width:"600"}} alt={title} />
            <div className="details-body text-dark">
                <h6 className="card-title">{title}</h6>
                <p className="location-text text-secondary">
                    {location}
                </p>
                <a href="#" className="btn btn-outline-success">View Details</a>
                </div>  
            </div>
        </div>
        
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired
}

export default Card;