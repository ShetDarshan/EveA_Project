import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/App.css";
import React, { Component } from "react";
import Slider from "react-slick";


export default class MultipleItems extends Component {
    componentDidMount() {
        console.log("Loading Component Mounted");
      }
      constructor(props) {
        super(props);
        this.state = {};
        props.getEvents();
      }
  render() {
    const settings = {
      dots: false,  
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };
    console.log("Here inside the class");
    return (
        <div className="carousel">
            <Slider {...settings}>
                <div> </div>
              </Slider>
        </div>
    );
    }
    }
