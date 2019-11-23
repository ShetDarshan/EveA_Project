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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Car1 from '../../img/Carousel.PNG';
import Car0 from '../../img/Carousel0.PNG';
import Car3 from '../../img/Carousel2.PNG';
import Car4 from '../../img/Carousel5.PNG';


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
    this.state={
      showMe:true
    }
  }

  operation(){

    this.setState({
      showMe:!this.state.showMe
    })
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
          
          <Carousel>
  <Carousel.Item >
  <div>
      <img src={Car1} alt="Dublin"/>
			</div>
  </Carousel.Item>
  <Carousel.Item>
  <div>
      <img src={Car0}  alt="Signup"/>
			</div>
  </Carousel.Item>
  <Carousel.Item>
  <div>
      <img src={Car3}   alt="Login"/>
			</div>
  </Carousel.Item>
  <Carousel.Item>
  <div>
      <img src={Car4}  alt="Search"/>
			</div>
  </Carousel.Item>
</Carousel>
      
               {Object.keys(dataset).map(categoriesList => (
                  <div key={categoriesList+"-carousel"} className="carousel">  
                  <button onClick={()=>this.operation()}>Browse</button>   
                      <h6 key={categoriesList+"-heading"} className="text-capitalise">{categoriesList.toLowerCase()}</h6>
                      {
                              this.state.showMe?
                      <Slider {...settings}>
                      {
                        dataset[categoriesList].map(data => (
                          <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                <div key={data.title+"-body"} className="card-body"  > 



                                <div key={data.title+"-image-container"} className="imageContainer" >
                                  <div key={data.title+"-background"} className="imageBg" style={{backgroundImage: `url(${data.img})`}}>
                                </div>
                                </div>




<Link to={`/event/${data.title}`} className="card-link">
<h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-2 mt-2 pt-0 " style={{paddingTop:"50px"}}>{data.title}</h6>
</Link>

<div class="card-stats">
      <div class="value">89</div>
      <div class="type">Interested</div>
    </div>
    <div class="stat">
      <div class="value">32</div>
      <div class="type">Going</div>
      </div>

                                  <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 mt-2 pt-0">{data.startdate}</h6>
                                  <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`} target="_blank" className="card-link">Show Route</a>
                                </div>
                              </div>  
                        ))}
                        </Slider>
                        
                        :null
                      }
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