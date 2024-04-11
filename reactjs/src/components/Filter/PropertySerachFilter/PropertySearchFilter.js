import { Button } from 'react-bootstrap';
import FilterRange from "../FilterRange/FilterRange";

import './PropertySearchFilter.css';

function PropertySearchFilter() {

    return (
        <form>
            <div style={{width: "100%"}}> 
                <FilterRange min={1} max={100} label="Rooms" defaultState={false}/>
                <FilterRange min={1} max={100} label="Beds"/>
                <FilterRange min={1} max={100} label="Bathrooms"/>
                <FilterRange min={1} max={100} label="Floor Area (sqm)"/>
            </div>
            <Button>Apply Filter</Button>
        </form>
    );
}

export default PropertySearchFilter;