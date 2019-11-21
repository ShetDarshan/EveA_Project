import React, { Component } from "react";
import Slider from "react-slick";

class Box extends components{
    render(){
      return(
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
      );
    }
  }
  export default connect(mapStateToProps)(Box);