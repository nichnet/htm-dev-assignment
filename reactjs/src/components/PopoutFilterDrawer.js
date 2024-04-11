import { Offcanvas } from 'react-bootstrap';
import PropertySearchFilter from './Filters/PropertySearchFilter/PropertySearchFilter';

function PopoutFilterDrawer({show, ranges, defaultAppliedRanges, onFiltersAppliedCallback, performSearchCallback, closeDrawerCallback}) {
    return (
        <Offcanvas show={show} onHide={closeDrawerCallback} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <PropertySearchFilter ranges={ranges} defaultAppliedRanges={defaultAppliedRanges} onFiltersAppliedCallback={(val) => onFiltersAppliedCallback(val)} performSearchCallback={() => {performSearchCallback(); closeDrawerCallback();}}/>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default PopoutFilterDrawer;