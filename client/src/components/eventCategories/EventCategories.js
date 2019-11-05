import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "../../css/App.css";

 class EventCategories extends Component {
  componentDidMount() {
    console.log("Loading Component Mounted");
  }
  constructor(props) {
    super(props);
    this.state = {};
    props.getEvents();
  }
   render() {
      const dataset  = this.props.events.events;
     if (Object.keys(dataset).length < 1 ){
      console.log(" %c Loading the data from ajax" ,"background-color:#fff; color :#000;");
       return <div>Loading...</div>
     } 
     else {
      console.log("dataset",dataset);
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
      return (
        <div className="eventCategories mt-2">
               {Object.keys(dataset).map(categoriesList => (
                  <div key={categoriesList+"-carousel"} className="carousel">     
                      <h4 key={categoriesList+"-heading"} className="text-capitalise">{categoriesList.toLowerCase()}</h4>
                      <div >
                      <div key={categoriesList+"-container"} className="card text-white  mb-3 card-slider"  >
                      <Slider {...settings}>
                      {
                          
                            dataset[categoriesList].map(data => (
                                    <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                          <div key={data.title+"-body"} className="card-body"  > 
                                          <div key={data.title+"-image-container"} className="imageContainer" >
                                            <img key={data.title+"-img"} src={data.img} alt={data.title}></img>
                                          </div>
                                            <h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-4 " style={{paddingTop:"50px"}}>{data.title}</h6>
                                            <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 "><b>Date: </b>{data.startdate}</h6>
                                            {/* <h6 key={data.enddate+"-enddate"} className="card-subtitle mb-2 "><span className="text-muted">End Date:</span>{data.enddate}</h6> */}
                                            {/* <h6 key={data.time+"-time"} className="card-subtitle mb-2"><b>Time: </b> {data.time}</h6> */}
                                      
                                            {/* <a href="#" className="card-link">Go to Site</a> */}
<<<<<<< HEAD
                                            <Link to={`/event/${data.eventId}`} className="card-link">
                                                   View Event
                                           </Link>
                                            <a href={"https://maps.google.com/?q="+ data.latitude +","+ data.longitude } target="_blank" className="card-link">Show Route</a>
=======
                                            <a href="#" className="card-link" style={{color:"#ff8800"}}>Event Details</a>
                                            <a href={"https://maps.google.com/?q="+ data.latitude +","+ data.longitude } target="_blank" className="card-link" style={{color:"#ff8800"}}>View Map</a>
>>>>>>> bfee8f1b7a2892eb4d20ccf471fb2d2a3b07a996
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