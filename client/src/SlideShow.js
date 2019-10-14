import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import './App.scss';
import Card from './components/dashboard/Card';
import data from './components/dashboard/data';
import {Navbar} from 'react-bootstrap';

// class component
class SlideShow extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      properties: data.properties,
      property: data.properties[0]
    }
  }

  nextProperty = () => {
    const newIndex = this.state.property.index+1;
    this.setState({
      property: data.properties[newIndex]
    })
  }

  prevProperty = () => {
    const newIndex = this.state.property.index-1;
    this.setState({
      property: data.properties[newIndex]
    })
  }

  render() {
    const {properties, property} = this.state;
    return (
      
      <div className="App">

        
        <Navbar color="dark" expand="xl">
        <Navbar.Brand>
        <a href="#">UPCOMING EVENTS</a>
      </Navbar.Brand>
        <ul className="navbar-nav ml-auto">
        <button style={{ borderRadius: 30 }}
          onClick={() => this.prevProperty()} 
          disabled={property.index === 0}
        >Prev</button><button style={{ borderRadius: 30 }}
        onClick={() => this.nextProperty()} 
        disabled={property.index === data.properties.length-1}
      >Next</button>
              </ul>

  </Navbar>
  
         
            
        <div> 
            <div className={`cards-slider active-slide-${property.index}`}>
              <div className="cards-slider-wrapper" style={{
                'transform':`translateX(-${property.index*(100/properties.length)}%)`
              }}>
                {
                  properties.map(property => <Card key={property._id} property={property} />)
                }
              
              </div>
            </div>
            </div>
            
            
            <div>
              
       
        

        <div className={`cards-slider active-slide-${property.index}`}>
          <div className="cards-slider-wrapper" style={{
            'transform':`translateX(-${property.index*(100/properties.length)}%)`
          }}>
            {
              properties.map(property => <Card key={property._id} property={property} />)
            }
          
          </div>
        </div>

        </div>
        </div>
  
      
  
       
    
    );
  }
}

export default SlideShow;