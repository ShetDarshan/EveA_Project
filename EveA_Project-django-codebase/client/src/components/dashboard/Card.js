import React from 'react';
import PropTypes from 'prop-types';

const Card = ({property}) => {
    const {index, image, title, location} = property;
    return (
        <div id={`card-${index}`} className="card">
            <img src={image} alt={title} />
            <div className="details">
                <span className="index">{index+1}</span>
                <p className="location">
                    {title}<br />
                    {location}
                </p>
                
            </div>
        </div>
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired
}

export default Card;