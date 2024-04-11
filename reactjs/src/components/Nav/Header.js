import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { MdMenu as ToggleIcon } from 'react-icons/md';
import './Header.css';

function Header() {

    const [isCollapsedMenuOpen, setIsCollapsedMenuOpen] = useState(false);

    const showCollapseIconOnScreenSize = "md";

    return (
        <Navbar expand={showCollapseIconOnScreenSize} className="primary">
            <Container>
                <Navbar.Brand href="/" style={{color: "white", fontWeight: "bold", display: "flex", alignItems: "center"}}>
                    <img src="images/nav-logo.png" className="logo" alt="Nick's Hotels"/>
                    <span className="ms-2" style={{verticalAlign: "middle"}}>Nick's Hotels</span>
                </Navbar.Brand>
                <ToggleIcon className={`icon d-${showCollapseIconOnScreenSize}-none`} onClick={() => setIsCollapsedMenuOpen(!isCollapsedMenuOpen)}/>
                <Navbar.Collapse className={`collapse navbar-collapse ${isCollapsedMenuOpen ? 'show' : ''}`} id="basic-navbar-nav">
                    <Nav variant="underline" defaultActiveKey="/home">
                        <Nav.Link href="/home">Hotels</Nav.Link>
                        <Nav.Link href="/transportation">Transportation</Nav.Link>
                        <Nav.Link href="/events">Events</Nav.Link>
                        <Nav.Link href="/services">Services</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Header;