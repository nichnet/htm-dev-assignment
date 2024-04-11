import { Offcanvas } from 'react-bootstrap';
import PropertySearchFilter from './PropertySerachFilter/PropertySearchFilter';

function PopoutFilterDrawer({show, closeDrawerCallback}) {
    return (
        <Offcanvas show={show} onHide={closeDrawerCallback} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Drawer</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <PropertySearchFilter/>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default PopoutFilterDrawer;