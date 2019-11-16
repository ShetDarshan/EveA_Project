import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/App.css";
import React from "react";
import EventCategories from "../eventCategories/EventCategories";
import Slider from "react-slick";
export default  class MainCorousel extends React.Component {
    
    render() {
      var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000
      };
      return (
        <div className="jumbotron slider">
            {/* <div className="mainSlider">
                    <Slider {...settings}>
                    <div>
                        <img src={require('./../../img/music.jpg')} alt="Bacn"></img>
                    </div>
                    <div>
                        <img src={require('./../../img/sports.jpg')} alt="Bacn"></img>
                    </div>
                    <div>
                        <img src={require('./../../img/music.jpg')}  alt="Bacn"></img>
                    </div>
                    <div>
                        <img src={require('./../../img/music.jpg')} alt="Bacn"></img>
                    </div>
                    <div>
                        <img src={require('./../../img/sports.jpg')} alt="Bacn"></img>
                    </div>
                    <div>
                        <img src={require('./../../img/music.jpg')} alt="Bacn"></img>
                    </div>
                    </Slider>
            </div> */}
            <EventCategories/>
      </div>
        
      );
    }
  }
