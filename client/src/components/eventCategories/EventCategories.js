import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "../../css/App.css";
import { bool } from "prop-types";
import Spinner from '../common/Spinner'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Car1 from '../../img/Carousel.PNG';

let styles = {
  margin: 'auto',
  width: '350px',
};

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
    let showItems = 4;
    console.log("State",this.props.locationData);
        if(window.innerWidth <= 576)showItems=1
        else if(window.innerWidth <= 768)showItems=2
        else if(window.innerWidth <= 1024)showItems=3
        else showItems=4

    const dataset  = this.props.events.events;
     if (Object.keys(dataset).length < 1 ){
      console.log(" %c Loading the data from ajax" ,"background-color:#fff; color :#000;");
       return <div><Spinner /></div>
     } 
     else {
      console.log("dataset",dataset);
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: showItems,
        slidesToScroll: 1
      };
      return (
       
        <div className="eventCategories mt-8">
          
           
           <div style={styles}>
		<Carousel>
			<div>
      <img src={Car1}  alt="Dublin"/>
				<p className="legend">Hong Kong</p>
			</div>
			<div>
				<img src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp" alt="Singapore"/>
			</div>
			<div>
				<img src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp" alt="Japan"/>
				<p className="legend">Japan</p>
			</div>
			<div>
				<img src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp" alt="Las Vegas"/>
			</div>
      </Carousel>
	</div>
      
               {Object.keys(dataset).map(categoriesList => (
                  <div key={categoriesList+"-carousel"} className="carousel">     
                      <h4 key={categoriesList+"-heading"} className="text-capitalise">{categoriesList.toLowerCase()}</h4>
                      <div >
                      <div key={categoriesList+"-container"} className="card text-white  mb-3 card-slider">
                      <Slider {...settings}>
                      {
                        dataset[categoriesList].map(data => (
                          <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                <div key={data.title+"-body"} className="card-body"  > 
                                <div key={data.title+"-image-container"} className="imageContainer" >
                                  <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}></div>
                                </div>
                                  <Link to={`/event/${data.title}`} className="card-link">
                                    <h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0 " style={{paddingTop:"50px"}}>{data.title}</h6>
                                  </Link>
                                  <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 mt-2 pt-0"><b>Date: </b>{data.startdate}</h6>
                                  <Link to={`/event/${data.title}`} className="card-link">View Event</Link>
                                  <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a>
                                </div>
                              </div>  
                        ))}
                        </Slider>
                        </div>  
                        </div>    
                  </div>
              ))} 
          </div>
      );
     }
  }
}
const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps, { getEvents })(EventCategories);