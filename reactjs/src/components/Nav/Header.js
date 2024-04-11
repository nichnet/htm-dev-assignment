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
        <Nav variant="underline" defaultActiveKey="/home">
            <Navbar.Brand href="#"><img src="images/nav-logo.png" className="logo" alt="Nick's Hotels"/></Navbar.Brand>
            <ToggleIcon className={`icon d-${showCollapseIconOnScreenSize}-none`} onClick={() => setIsCollapsedMenuOpen(!isCollapsedMenuOpen)}/>
            <Navbar.Collapse className={`collapse navbar-collapse ${isCollapsedMenuOpen ? 'show' : ''}`} id="basic-navbar-nav">
                <Nav className="justify-content-center">
                    <Nav.Link href="/home">Hotels</Nav.Link>
                    <Nav.Link href="/home">Transportation</Nav.Link>
                    <Nav.Link href="/home">Events</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                <Nav.Item>
                    <Nav.Link href="#services">Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Nav>
    </Container>
</Navbar>



    );
}


export default Header;