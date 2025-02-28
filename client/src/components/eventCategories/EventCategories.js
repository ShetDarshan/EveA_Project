import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "../../css/App.css";
import { bool } from "prop-types";
import Search from "../dashboard/Search";
import Spinner from '../common/Spinner'

 class EventCategories extends Component {
  componentDidMount() {
    console.log("Loading Component Mounted");
    navigator.geolocation.getCurrentPosition(function (location) {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude 
      })
    }.bind(this));

    // OR
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
    });

  }
  constructor(props) {
    super(props);
    this.state = {lat:"",lon:""};
    props.getEvents();
  }
   render() {
    const dataset  = this.props.events.events;
     if (Object.keys(dataset).length < 1 ){
        console.log(" %c Loading the data from ajax" ,"background-color:#fff; color :#000;");
         return <div class="spinner"></div>
     } 
     else {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: false} },
          {breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 1, dots: false } },
          { breakpoint: 600, settings: { slidesToShow: 1,slidesToScroll: 1, dots: false}}
        ]
      };
      return (<div>
        <div className="search-container">
            <Search/>
        </div>
        <div className="eventCategories mt-2">
               {Object.keys(dataset).map(categoriesList => (
                  <div key={categoriesList+"-carousel"} className="carousel">     
                      <h2 key={categoriesList+"-heading"} className="text-capitalise text-primary">{categoriesList.toLowerCase()}</h2>
                      <div> 
                      <div key={categoriesList+"-container"} className="card  mb-3 card-slider">
                      <Slider {...settings}>
                      {
                        dataset[categoriesList].map(data => (
                          <div key={data.title+"card-slider"} className="card card-slider">
                                  <div key={data.title+"-body"} className="card-body"> 
                                    <Link to={`/event/${data.title}`} className="card-link">
                                      <div key={data.title+"-image-container"} className="imageContainer" title="Click to see more details">
                                      <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}></div>
                                    </div>
                                    <h5 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0 lead " style={{paddingTop:"50px"}}>{data.title}</h5>
                                  </Link>
                                  <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 mt-2 pt-0 lead float-left"><b>{data.startdate}</b></h6>
                                  {/* <Link to={`/event/${data.title}` } className="card-link">View Event</Link> */}
                                   <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link locationIcon float-right"></a> 
                                  {/* <a href={`https://www.google.com/maps?saddr=${this.props.locationData.lat},${this.props.locationData.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a> */}
                                  <div className="clear-fix"></div>
                                </div>
                              </div>  
                        ))}
                        </Slider>
                        </div>  
                        </div>    
                  </div>
              ))} 
          </div>
      </div>
      );
     }
  }
}
const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps, { getEvents })(EventCategories);