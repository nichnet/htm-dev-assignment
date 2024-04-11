import { useState } from 'react';
import { calculateDistanceToTownCentre } from '../../utils/constants';
import { Col, Row, Button, NavLink } from 'react-bootstrap';
import TextTruncate from 'react-text-truncate';
import {
    MdBathtub as BathroomsIcon, 
    MdDoorFront as RoomsIcon, 
    MdBed as BedsIcon, 
    MdSquareFoot as FloorAreaIcon, 
} from 'react-icons/md';

import './PropertyCard.css';
import PropertyDetails from '../PropertyDetails/PropertyDetails';

function PropertyCard({data, onPropertySelectedCallback}) {

    return (
        <div className="property-card box shadow rounded">
            <Row>
                <Col xs={3} className="pe-0">
                    <img className="rounded" src={`/images/properties/${data.id}_hero_winter_thumbnail.jpg`} alt={data.name}/>           
                </Col>
                <Col xs={9} sm={7} md={6}>
                    <PropertyDetails data={data} truncateDecsription={true} truncatedDescriptionReadMoreCallback={onPropertySelectedCallback}/>
                </Col>
                <Col xs={12} sm={2} md={3} className="d-flex flex-column justify-content-between">
                    <p className="text-end text-success">Available</p>
                    <Button className="mt-2 mt-sm-0 w-100" onClick={onPropertySelectedCallback}>View or Book</Button>
                </Col>
            </Row>
        </div>
    );
}

export default PropertyCard;