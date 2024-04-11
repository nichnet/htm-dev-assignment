import { Card, Col, Row, Button } from 'react-bootstrap';
import {
    MdBathtub as BathroomsIcon, 
    MdDoorFront as RoomsIcon, 
    MdBed as BedsIcon, 
    MdSquareFoot as FloorAreaIcon, 
    MdMail as EnquiryIcon,
} from 'react-icons/md';

import './PropertyCard.css';
import TextTruncate from 'react-text-truncate';

function PropertyCard({data}) {

    const calculateDistanceToTownCentre = (distance) => {
        if (distance < 25) {
            return "In Town";
        } else {
            let roundedMetres = Math.round(distance / 100) * 100;
        
            let outDistance = `${roundedMetres}m`;
            
            if (roundedMetres >= 1000) {
                // Calculate kilometers
                let kilometres = Math.floor(roundedMetres / 1000);
                let remainingMetres = roundedMetres % 1000;
                let kmm = kilometres;
        
                if(remainingMetres > 0) {
                    kmm += `.${remainingMetres / 100}`;
                }
                
                outDistance = `${kmm}km`;
            }
            
            return `${outDistance} from Town`;
        }
    }

    return (
        <div className="property-card box shadow rounded">
            <Row>
                <Col xs={3} className="pe-0">
                    <img className="rounded" src={`/images/properties/${data.id}_hero_winter_thumbnail.jpg`} alt={data.name}/>           
                </Col>
                <Col xs={6}>
                    <p style={{fontSize: "1.2em", fontWeight: 600}}>{data.name}</p>
                    <div className="details">
                        <p style={{fontSize:"0.9em", fontWeight: 400}}><span>{calculateDistanceToTownCentre(data.villageCentreDistanceId)}</span></p>
                        <p style={{fontSize: "0.7em", fontWeight: 350}}>
                            <span>{data.gradeSort}<RoomsIcon/></span>
                            <span>{data.standardPax}<BedsIcon/></span>
                            <span>{data.bathrooms}<BathroomsIcon/></span>
                            <span>{data.floorArea}<FloorAreaIcon/></span>
                        </p>
                    </div>
                    <div style={{marginTop: "8px", fontSize:"0.85em"}}>
                        <TextTruncate line={3} element="p" text={data.description} truncateText="..."
                            textTruncateChild={<a href="#">Read more</a>}/>
                    </div>
                </Col>
                <Col xs={3}>
                    <Button>Book Now</Button>
                    <Button><EnquiryIcon/> Enquire</Button>
                </Col>
            </Row>
        </div>
    )
}

export default PropertyCard;