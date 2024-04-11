import TextTruncate from "react-text-truncate";
import { calculateDistanceToTownCentre } from "../../utils/constants";
import {
    MdBathtub as BathroomsIcon, 
    MdDoorFront as RoomsIcon, 
    MdBed as BedsIcon, 
    MdSquareFoot as FloorAreaIcon, 
    MdUpgrade as UpgradeIcon,
} from 'react-icons/md';

import './PropertyDetails.css';

function PropertyDetails({data, truncateDecsription=false, truncatedDescriptionReadMoreCallback}) {

    return (
        <div className="property-details">
            <p style={{fontSize: "1.2em", fontWeight: 600}}>{data.name}</p>
            <div className="info">
                <p style={{fontSize:"0.9em", fontWeight: 400}}><span>{calculateDistanceToTownCentre(data.villageCentreDistanceId)}</span></p>
                <p style={{fontSize: "0.7em", fontWeight: 350}}>
                    <span>{data.gradeSort}<RoomsIcon/></span>
                    <span>{data.standardPax}<BedsIcon/></span>
                    <span>{data.bathrooms}<BathroomsIcon/></span>
                    <span>{data.floorArea}sqm<FloorAreaIcon/></span>
                    {data.upgradedFacilities ? <span className="text-primary"><b>Upgraded <UpgradeIcon/></b></span> : null}
                </p>
            </div>
            <div style={{marginTop: "8px", fontSize:"0.85em"}}>
                {
                    truncateDecsription ? 
                    <TextTruncate line={3} element="p" text={data.description} truncateText="..."
                    textTruncateChild={<a href="#" onClick={truncatedDescriptionReadMoreCallback}>Read more</a>}/>
                    :
                    <p>{data.description}</p>
                }
            </div>
        </div>
    );
}

export default PropertyDetails;