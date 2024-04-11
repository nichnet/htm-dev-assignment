import { Button } from 'react-bootstrap';
import FilterRange from "../FilterRange";

import './PropertySearchFilter.css';
import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox';

function PropertySearchFilter({maximums, onFiltersAppliedCallback}) {

    const [appliedFilters, setAppliedFilters] = useState({});

    const onFilterValueChanged = (key, value) => {
        setAppliedFilters(prevAppliedFilters => {
                //remove if now null
                if (value === null && prevAppliedFilters.hasOwnProperty(key)) {
                    const { [key]: _, ...updatedFilters } = prevAppliedFilters;
                    return updatedFilters;
                }
                //add/update existing valid values
                else if (value !== null) {
                    return { ...prevAppliedFilters, [key]: value };
                }

                return prevAppliedFilters;
            }
        );
    }

    return (
        <form>
            <div style={{width: "100%"}}>
                <FilterRange min={1} max={maximums?.max_rooms ?? 1} label="Rooms" defaultState={true} valueChangedCallback={(val) => onFilterValueChanged("max_rooms", val)}/>
                <FilterRange min={1} max={maximums?.max_beds ?? 1} label="Beds" valueChangedCallback={(val) => onFilterValueChanged("max_beds", val)}/>
                <FilterRange min={1} max={maximums?.max_bathrooms ?? 1} label="Bathrooms" valueChangedCallback={(val) => onFilterValueChanged("max_bathrooms", val)}/>
                <FilterRange min={1} max={maximums?.max_floorarea ?? 1} label="Floor Area (sqm)" valueChangedCallback={(val) => onFilterValueChanged("max_floorarea", val)}/>
                <FilterCheckbox label="Upgraded Amenities" valueChangedCallback={(val) => onFilterValueChanged("upgraded_amenities", val)}/>
            </div>
            <Button onClick={() => onFiltersAppliedCallback(appliedFilters)}>Apply Filter</Button>
        </form>
    );
}

export default PropertySearchFilter;