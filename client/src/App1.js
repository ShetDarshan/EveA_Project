import React, { Component } from 'react';
import Slider from './components/CarouselSlide'
import './App1.scss'

const movies = [
  {
    id: 1,
    image: '//d3qvqlc701gzhm.cloudfront.net/full/d343b8b8d5d21431e506116d9e5fb92f2fb36b4e9491e8b611c9c6779dc1212d.jpg',
    /*imageBg: '/images/slide1b.webp',*/
    title: 'Life above Everything: Lucian Freud and Jack B. Yeats'
  },
  {
    id: 2,
    image: '//tours.360dublincity.com/siteAssets/events/event_189557.jpg',
    /*imageBg: '/images/slide2b.webp',*/
    title: 'Ceramics Ireland Selected Members Exhibition'
  },
  {
    id: 3,
    image: '//tudublin.ie/media/website/news/2019/homepage/Engineers-Ireland-Conference-Home-Image.jpg',
    /*imageBg: '/images/slide3b.webp',*/
    title: 'Engineering Education: Future skills, standards and mobility',
  },
  {
    id: 4,
    image: '//d3qvqlc701gzhm.cloudfront.net/full/d343b8b8d5d21431e506116d9e5fb92f2fb36b4e9491e8b611c9c6779dc1212d.jpg',
    /*imageBg: '/images/slide4b.webp',*/
    title: 'Tommy Tiernan – Paddy Crazy Horse'
  },
  {
    id: 5,
    image: '//www.visitsavannah.com/sites/default/files/styles/large_square/public/picnic-in-the-park.jpg?itok=RUcL2fpD',
    /*imageBg: '/images/slide5b.webp',*/
    title: 'Red Line Book Festival 2019'
  },
  {
    id: 6,
    image: '//www.visitsavannah.com/sites/default/files/styles/large_square/public/picnic-in-the-park.jpg?itok=RUcL2fpD',
    /*imageBg: '/images/slide6b.webp',*/
    title: '3Arena Dublin'
  }
];

class App1 extends Component {
  render() {
    return (
      <div className="app">
        <Slider>
          {movies.map(movie => (
            <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
          ))}
        </Slider>
      </div>
    );
  }
}

export default App1;
