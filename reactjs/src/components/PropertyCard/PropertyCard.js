import { Card, Col, Row, Button } from 'react-bootstrap';
import {
    MdBathtub as BathroomsIcon, 
    MdDoorFront as RoomsIcon, 
    MdBed as BedsIcon, 
    MdSquareFoot as FloorAreaIcon, 
    MdMail as EnquiryIcon,
} from 'react-icons/md';
import { BiSolidCompass as TownCenterIcon } from 'react-icons/bi';

import './PropertyCard.css';

function PropertyCard({data}) {
    return (
        <Card className="property-card box shadow rounded">
            <Row>

            <Col xs={3} className="pe-0">
                <Card.Img src="/images/properties/hero_winter_thumbnail.jpg" alt={data.name}/>           
            </Col>
            <Col xs={6}>
                <p style={{fontSize: "1.2em", fontWeight: "600"}}>{data.name}</p>
                <div className="details">
                    <p style={{fontSize: "0.9em"}}>
                        <span>{data.gradeSort}<RoomsIcon/></span>
                        <span>{data.standardPax}<BedsIcon/></span>
                        <span>{data.bathrooms}<BathroomsIcon/></span>
                        <span>{data.floorArea}<FloorAreaIcon/></span>
                    </p>
                    <p style={{fontSize:"0.75em"}}><span>{data.villageCentreDistanceId}<TownCenterIcon/></span></p>
                </div>
                <p style={{fontSize:"0.7em"}} className="d-none d-sm-block">{data.description}</p>
                <a href="#" className="d-block d-sm-none">Read More</a>
            </Col>
            <Col xs={3}>
                <Button>Book Now</Button>
                <Button><EnquiryIcon/> Enquire</Button>
            </Col>
            </Row>
        </Card>
    )
}

export default PropertyCard;