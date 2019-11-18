import React, { Component } from 'react';
import Card from './Card';
import data from './data';
import { Button } from 'reactstrap';


// class component
class Sliding extends Component {
  

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
        {/* <TitleBar/> */}

        <Button outline color="info"
          onClick={() => this.nextProperty()} 
          disabled={property.index === data.properties.length-1}
        >Next</Button>
        <Button outline color="info"
          onClick={() => this.prevProperty()} 
          disabled={property.index === 0}
        >Prev</Button>

        <div className="page">
            <section>
                
                <h4>Upcoming Events</h4>
            </section>

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

export default Sliding;