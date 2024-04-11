import { Offcanvas } from 'react-bootstrap';
import PropertySearchFilter from './Filters/PropertySearchFilter/PropertySearchFilter';

function PopoutFilterDrawer({show, maximums, onFiltersAppliedCallback, closeDrawerCallback}) {
    return (
        <Offcanvas show={show} onHide={closeDrawerCallback} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Drawer</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <PropertySearchFilter maximums={maximums} onFiltersAppliedCallback={(val) => { onFiltersAppliedCallback(val); closeDrawerCallback()}}/>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default PopoutFilterDrawer;