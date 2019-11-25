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
import Car0 from '../../img/Car2.PNG';
import Car3 from '../../img/Car3.PNG';
import Car4 from '../../img/Car4.PNG';


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
                  <button onClick={()=>this.operation()}>Browse Events</button>   
                      <h4 key={categoriesList+"-heading"} className="text-capitalise">{categoriesList.toLowerCase()}</h4>
                      {
                              this.state.showMe?
                      <Slider {...settings}>
                      {
                        dataset[categoriesList].map(data => (
                          <div key={data.title+"card-slider"} className="card card-slider"  title= {data.title}>
                            
                                <div key={data.title+"-body"} className="card-body"  > 
                                
                                
                                <br></br>

                               

<Link to={`/event/${data.title}`} className="card-link" style={{color:"white"}}>
<h4 style={{color:"white"}} key={data.title+"-desc"} title= {data.title} className="card-title" 
style={{paddingTop:"50px", textAlign:"left"}}>{data.title}</h4>
</Link> <br></br>

                                <div key={data.title+"-image-container"} className="imageContainer" >
                                  <div key={data.title+"-background"} className="imageBg" 
                                  style={{backgroundImage: `url(${data.img})`,width:"255px",height:"160px"}}>
                                </div>
                                </div><br></br>
     
                               

                                  <div key={data.title+"-address"} className="card-text collapse">{data.address}</div>
                                  <h6 className="card-text mb-2">{data.address}
                        </h6>                              
                                  <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`}
                                   target="_blank" className="card-link"><i class="fas fa-map-marker text-muted float-right fa-lg p-1 my-1" 
                                   data-toggle="tooltip" data-placement="top" title="See Location"></i></a>

                                  <h2 style={{paddingRight:"8rem",
                               paddingTop:" 40px",textAlign:"end"}} key={data.startdate+"-startdate"} className="far fa-calendar pr-5" style={{color:"white",align:"left",paddingRight:"8rem!important",
                              paddingTop:" 40px"}}>{data.startdate}</h2>
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