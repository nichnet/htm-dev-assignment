import { Container } from "react-bootstrap";

import './Footer.css';

function Footer() {

    const getCurrentYear = () => {
        return 2024;
    }

    return (
        <div className="footer">
            <Container className="d-flex justify-content-center">
                <span>{getCurrentYear()} © Nick's Hotels</span>
            </Container>
        </div>
    );
}

export default Footer;