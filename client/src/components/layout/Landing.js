
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
// import { Link } from 'react-router-dom'
// import Face from "../../components/layout/Face";
// import evea from "../../img/evea.jpg"
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
      const dataset  = this.props.events.events;
      if(!dataset){
        return <div>Loading...</div>
      }
    //  if (Object.keys(dataset).length < 1 ){
    //   console.log(" %c Loading the data from ajax" ,"background-color:#fff; color :#000;");
    //    return <div>Loading...</div>
    //  } 
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
                      <div key={categoriesList+"-container"} className="card text-white bg-secondary mb-3 card-slider" >
                      <Slider {...settings}>
                      {
                          
                            dataset[categoriesList].map(data => (
                                    <div key={data.title+"card-slider"} className="card card-slider "  title= {data.title}>
                                          <div key={data.title+"-body"} className="card-body"  > 
                                          <div key={data.title+"-image-container"} className="imageContainer" >
                                            <img key={data.title+"-img"} src={data.img}></img>
                                          </div>
                                            <h6 key={data.title+"-desc"} title= {data.title} className="card-title mb-4 ">{data.title}</h6>
                                            <h6 key={data.startdate+"-startdate"} className="card-subtitle mb-2 "><b>Start Date: </b>{data.startdate}</h6>
                                            {/* <h6 key={data.enddate+"-enddate"} className="card-subtitle mb-2 "><span className="text-muted">End Date:</span>{data.enddate}</h6> */}
                                            <h6 key={data.time+"-time"} className="card-subtitle mb-2"><b>Time: </b> {data.time}</h6>
                                      
                                            <a href="#" className="card-link">Go to Site</a>
                                            <a href={"https://maps.google.com/?q="+ data.latitude +","+ data.longitude } target="_blank" className="card-link">Show Route</a>
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
  // render() {
  //   console.log({evea});
  //   return (
  //       <div className="landing jumbotron">
  //        <div className="landing-inner text-light"> 
  //         <div className="container">
  //           <div className="row">
  //             <div className="col-md-12 text-center">
  //             <img src={evea}></img>
  //               {/* <img src="../img/evea.jpg"></img> */}
  //               {/* <h1 className="display-3 mb-4">Never Miss an Event
  //               </h1> */}
  //               <hr />
  //                {/* <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
  //               <Link to="/login" className="btn btn-lg btn-info mr-2">Login</Link>
  //               <Face /> */}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}
const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps, { getEvents })(Landing);