import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Car1 from '../../img/Carousel.png';
import Car0 from '../../img/Car2.png';
import Car3 from '../../img/Car3.png';
import Car4 from '../../img/Car4.png';
import "../../css/splash.css"



 class Splash extends Component {
  

   render() {
    
return (
    
    <section id="mim">
        <div>  
            
          <Carousel>
            <Carousel.Item >
                <div><img src={Car1}  alt="Dublin"/></div>
            </Carousel.Item>
            <Carousel.Item >
                <div><img src={Car0}  alt="Signup"/></div>
            </Carousel.Item>
            <Carousel.Item >
                <div><img src={Car3}   alt="Login"/></div>
            </Carousel.Item >
            <Carousel.Item >
                <div><img src={Car4}  alt="Search"/></div>
            </Carousel.Item>
        </Carousel>
    

        
        

    </div>   
    </section>            
      
)

}}




export default Splash;