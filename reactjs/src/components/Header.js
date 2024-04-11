import { useState } from 'react';
import { Navbar, Offcanvas, Container, Button } from 'react-bootstrap';
import PropertySearchFilter from './Filter/PropertySearchFilter';


function Header() {
  return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#">Your Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <p>blah links</p>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}


export default Header;