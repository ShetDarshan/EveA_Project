import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Search from  './searchbox';


const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" light>
        <NavbarBrand className="mr-auto"><h2 style={{color:"white"}}>CATEGORIES</h2></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#free"><h5 style={{color:"White"}}>FREE</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#music"><h5 style={{color:"white"}}>MUSIC AND ENTERTAINMENT</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#artandtheatre"><h5 style={{color:"white"}}>FASHION, ART AND THEATRE</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#businessandeducation"><h5 style={{color:"white"}}>EDUCATION, BUSINESS AND TECHNOLOGY</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#foodanddrink"><h5 style={{color:"white"}}>FOOD AND DRINK</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#tourism"><h5 style={{color:"white"}}>TOURISM AND SIGHTSEEING</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#health"><h5 style={{color:"white"}}>HEALTH AND SPORTS</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#community"><h5 style={{color:"white"}}>COMMUNITY AND FESTIVALS</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#other"><h5 style={{color:"white"}}>OTHER</h5></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;