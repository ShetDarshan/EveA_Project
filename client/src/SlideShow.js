import React, { Component } from 'react';
import './App.css';
import './App.scss';
import Card from './components/dashboard/Card';
import data from './components/dashboard/data';
import {Navbar, NavbarBrand} from 'react-bootstrap';
import Example from './components/dashboard/navbar_toggler';
import Search from  './components/dashboard/searchbox';


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

      
      <div className="App" >
              <Search/>
              <Example/>
              
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >UPCOMING EVENTS</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
             <div style={{paddingTop: "422px"}} id="free">
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >FREE EVENTS</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}} id="music">
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >MUSIC EVENTS</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}} id="artandtheatre">
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >ART AND THEATRE</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}} id="businessandeducation">
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >BUSINESS AND EDUCATION</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}} id="foodanddrinks">
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >FOOD AND DRINKS</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}}>
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >TRAVEL</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(50/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}}>
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >HEALTH AND SPORTS</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
              <div style={{paddingTop: "422px"}}>
              <Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
                <NavbarBrand href="/upcomingevents" className="mr-auto"><h4 style={{color:"white"}} >COMMUNITY AND FESTIVALS</h4></NavbarBrand>
                <ul className="navbar-nav ml-auto">
                <button style={{ borderRadius: 30 }}
                  onClick={() => this.prevProperty()} 
                  disabled={property.index === 0}
                >Prev
                </button>
                &nbsp;&nbsp;
                <button style={{ borderRadius: 30 }}
                onClick={() => this.nextProperty()} 
                disabled={property.index === data.properties.length-1}
              >Next</button>
                      </ul>
                      </Navbar> 
                <div> 
                    <div className={`cards-slider active-slide-${property.index}`} 
                    style={{
                      display: "list-item",
                      float: "left"}}
                    >
                      <div id = "upcomming" className="cards-slider-wrapper" style={{
                        'transform':`translateX(-${property.index*(100/properties.length)}%)`
                      }}>
                        {
                          properties.map(property => <Card key={property._id} property={property} />)
                        }
                      </div>
                    </div>
              </div>
              </div>
            {/* <Search/> */}
      </div>

      



      
    );
  }
}

export default SlideShow;