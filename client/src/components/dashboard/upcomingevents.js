import React, { Component } from 'react';
import  DatePicker from './DatePicker';
import {Navbar, NavbarBrand} from 'react-bootstrap';
import Search from  './searchbox';

class upcomingevents extends Component {
    render() {
        return(
            <div>
                <Search/>
<DatePicker/>
<div>
<Navbar color="dark" light style={{background:"#af1a1a", color:"white"}}>
        <NavbarBrand style={{paddingTop: "-1000px"}} className="mr-auto"><h2 style={{color:"white"}}>UPCOMING EVENTS</h2></NavbarBrand>
        </Navbar>


        </div>
        </div>
            
        );
    }
}
export default upcomingevents;