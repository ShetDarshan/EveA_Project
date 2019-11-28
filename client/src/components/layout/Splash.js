import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Car1 from '../../img/Carousel.png';
import Car0 from '../../img/Car2.png';
import Car3 from '../../img/Car3.png';
import Car4 from '../../img/Car4.png';
import { purple } from "@material-ui/core/colors";
import { PlayCircleFilledWhite, CenterFocusStrong } from "@material-ui/icons";
import Footer from './Footer'


 class Splash extends Component {
  

   render() {
    
return (
    
        <div>  

        <div><a href="./eventboard" className="btn btn-primary btn-lg btn-block" role="button" style={{backgroundColor:"white",color:"purple"}} aria-pressed="true"> CLICK HERE TO SEARCH EVENTS BY CATEGORY </a></div>

          <Carousel>
            <Carousel.Item >
                <div><img src={Car1}  alt="Dublin"/></div>
            </Carousel.Item>
            <Carousel.Item>
                <div><img src={Car0}  alt="Signup"/></div>
            </Carousel.Item>
            <Carousel.Item>
                <div><img src={Car3}   alt="Login"/></div>
            </Carousel.Item>
            <Carousel.Item>
                <div><img src={Car4}  alt="Search"/></div>
            </Carousel.Item>
        </Carousel>
    

        
        

    </div>   
                 
      
)

}}




export default Splash;