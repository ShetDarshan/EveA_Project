import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Search from  './searchbox';


const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="light" light>
        <NavbarBrand href="/" className="mr-auto"><h2 style={{color:"blue"}}>CATEGORIES</h2></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#free"><h6 style={{color:"red"}}>FREE</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#music"><h6 style={{color:"red"}}>MUSIC</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#artandtheatre"><h6 style={{color:"red"}}>ART AND THEATRE</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="businessandeducation"><h6 style={{color:"red"}}>BUSINESS AND EDUCATION</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="foodanddrinks"><h6 style={{color:"red"}}>FOOD AND DRINKS</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="travel"><h6 style={{color:"red"}}>TRAVEL</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href=""><h6 style={{color:"red"}}>HEALTH AND SPORTS</h6></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href=""><h6 style={{color:"red"}}>COMMUNITY AND FESTIVALS</h6></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;