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

       

          <Carousel>
            <Carousel.Item >
         <div><a href="./eventboard"><img src={Car1}  alt="Dublin"/>/</a></div>
            </Carousel.Item>
            <Carousel.Item>
                <div><a href="./register"><img src={Car0}  alt="Signup"/></a></div>
            </Carousel.Item>
            <Carousel.Item>
                <div><a href="./login"><img src={Car3}   alt="Login"/></a></div>
            </Carousel.Item>
            <Carousel.Item>
                <div><a href="./Search"><img src={Car4}  alt="Search"/></a></div>
            </Carousel.Item>
        </Carousel>
    

        
        

    </div>   
                 
      
)

}}




export default Splash;