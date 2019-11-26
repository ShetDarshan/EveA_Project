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


<div className="card gradient-card">

<div class="ico-wrap">
                        <span class="mbr-iconfont fa-volume-up fa"></span>
                    </div>
                   <div className="text-white d-flex h-50 mask peach-gradient-rgba">
              <h5 key={categoriesList+"-heading"} className="first-content align-self-center p-3">{categoriesList.toUpperCase()}
              <p>"All the world's a stage"</p>
                       </h5>
                       
                       <button style={{borderRadius:"50%",}} onClick={()=>this.operation()}>
                         <i class="fa fa-angle-double-down float-right fa-lg p-1 my-1" aria-hidden="true">
                         </i></button> 
              </div>
              </div>
                     
                      {
                              this.state.showMe?
                      <Slider {...settings}>
                      {
                        dataset[categoriesList].map(data => (
                          <div key={data.title+"card-slider"} className="card card-slider"  title= {data.title}>
                            
                                <div key={data.title+"-body"} className="card-body"  > 
                                
                                
                                <br></br>

                                <div key={data.title+"-image-container"} className="imageContainer" >
                                  <div key={data.title+"-background"} className="imageBg" 
                                  style={{backgroundImage: `url(${data.img})`,width:"255px",height:"160px"}}>
                                </div>
                                </div><br></br>
                                
<Link to={`/event/${data.title}`} className="card-link" style={{color:"white"}}>
<h4 style={{color:"white"}} key={data.title+"-desc"} title= {data.title} className="card-title" 
style={{paddingTop:"50px", textAlign:"left"}}>{data.title}</h4>
</Link> <br></br>
     
                                                    
                                  <a href={`https://www.google.com/maps?saddr=${this.state.lat},${this.state.lon}&daddr=${data.latitude},${data.longitude}`}
                                   target="_blank" className="card-link"><i class="fas fa-map-marker text-muted float-right fa-lg p-1 my-1" 
                                   data-toggle="tooltip" data-placement="top" title="See Location"></i></a>
                                        <i class="fas fa-heart text-muted float-right p-1 my-1 mr-3" data-toggle="tooltip" data-placement="top" title="I like it"></i>

                                  <h6 style={{textAlign:"left"}} key={data.startdate+"-startdate"} ><i className="far fa-calendar float-left fa-lg" ></i>{data.startdate}</h6>
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