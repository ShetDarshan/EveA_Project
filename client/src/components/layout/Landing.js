
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import Slider from "react-slick";
import "../../css/App.css";
const config = {
  apiKey: "AIzaSyD4svmLSEA5IDa49VKgK45vbUCL7JkO52I",
  authDomain: "evea-prj.firebaseapp.com",
  databaseURL: "https://evea-prj.firebaseio.com",
  projectId: "evea-prj",
  storageBucket: "evea-prj.appspot.com",
  messagingSenderId: "342374627785",
  appId: "1:342374627785:web:3242138c0109915fc19018",
  measurementId: "G-4L5XLJ17HJ"
};
const firebase = require('firebase')
firebase.initializeApp(config)
 class Landing extends Component {
  componentDidMount() {
    console.log("Loading Component Mounted");
  }
  constructor(props) {
    super(props);
    this.state = {};
    props.getEvents();
  }
   render() {

    let showItems = 4

    if(window.innerWidth <= 576)showItems=1
    else if(window.innerWidth <= 768)showItems=2
    else if(window.innerWidth <= 1024)showItems=3
    else showItems=4
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
        slidesToShow: showItems,
        slidesToScroll: 1
      };
      return (
        <div className="eventCategories mt-2">
               {Object.keys(dataset).map(categoriesList => (
                  <div key={categoriesList+"-carousel"} className="carousel">     
                      <h4 key={categoriesList+"-heading"} className="text-capitalise">{categoriesList.toLowerCase()}</h4>
                      <div key={categoriesList+"-container"} className="card text-white  mb-3 card-slider" >
                      <Slider {...settings}>
                      {
                          
                            dataset[categoriesList].map(data => (
                                    <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                          <div key={data.title+"-body"} className="card-body"  > 
                                          <div key={data.title+"-image-container"} className="imageContainer" >
                                            <img key={data.title+"-img"} src={data.img}></img>
                                          </div>
                                            <h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-4 ">{data.title}</h6>
                                            <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 "><b>Date: </b>{data.startdate}</h6>
                                            {/* <h6 key={data.enddate+"-enddate"} className="card-subtitle mb-2 "><span className="text-muted">End Date:</span>{data.enddate}</h6> */}
                                            {/* <h6 key={data.time+"-time"} className="card-subtitle mb-2"><b>Time: </b> {data.time}</h6> */}
                                      
                                            {/* <a href="#" className="card-link">Go to Site</a> */}
                                            <a href="#" className="card-link" style={{color:"#ff8800"}}>Event Details</a>
                                            <a href={"https://maps.google.com/?q="+ data.latitude +","+ data.longitude } target="_blank" className="card-link" style={{color:"#ff8800"}}>View Map</a>
                                          </div>
                                        </div>                                
                              
                        ))}
                        </Slider>
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

export default connect(mapStateToProps, { getEvents })(Landing);