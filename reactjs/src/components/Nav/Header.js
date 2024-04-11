import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';
import { MdMenu as ToggleIcon } from 'react-icons/md';
import { useState } from 'react';

function Header() {

    const [isCollapsedMenuOpen, setIsCollapsedMenuOpen] = useState(false);

    const showCollapseIconOnScreenSize = "md";


    return (
<Navbar expand={showCollapseIconOnScreenSize} className="primary">
    <Container>
        <Navbar.Brand href="#"><img src="images/nav-logo.png" className="logo" alt="Nick's Hotels"/></Navbar.Brand>
        <ToggleIcon className={`icon d-${showCollapseIconOnScreenSize}-none`} onClick={() => setIsCollapsedMenuOpen(!isCollapsedMenuOpen)}/>
        <Navbar.Collapse className={`collapse navbar-collapse ${isCollapsedMenuOpen ? 'show' : ''}`} id="basic-navbar-nav">
            <Nav variant="underline" defaultActiveKey="/home" className="justify-content-center">
                <Nav.Link href="/home">Hotels</Nav.Link>
                <Nav.Link href="/transportation">Transportation</Nav.Link>
                <Nav.Link href="/events">Events</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>



    );
}


export default Header;