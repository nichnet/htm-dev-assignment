import { Button } from 'react-bootstrap';
import FilterRange from "../FilterRange";

import './PropertySearchFilter.css';
import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox';
import Spinner from '../../Spinner';

function PropertySearchFilter({ranges, defaultAppliedRanges, onFiltersAppliedCallback, performSearchCallback}) {

    const [appliedFilters, setAppliedFilters] = useState(defaultAppliedRanges ?? ranges);

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

    useEffect(() => {
        if(onFiltersAppliedCallback) {
            onFiltersAppliedCallback(appliedFilters);
        }
    }, [appliedFilters]);

    return (
        <form>
            <div style={{width: "100%"}}>
                {
                    !ranges ?
                    <Spinner/>
                    :
                    <>
                        <FilterRange clampedRange={ranges.rooms} defaultValue={defaultAppliedRanges?.rooms} label="Rooms" valueChangedCallback={(val) => onFilterValueChanged("rooms", val)}/>
                        <FilterRange clampedRange={ranges.beds} defaultValue={defaultAppliedRanges?.beds} label="Beds" valueChangedCallback={(val) => onFilterValueChanged("beds", val)}/>
                        <FilterRange clampedRange={ranges.bathrooms} defaultValue={defaultAppliedRanges?.bathrooms} label="Bathrooms" valueChangedCallback={(val) => onFilterValueChanged("bathrooms", val)}/>
                        <FilterRange clampedRange={ranges.floorarea} defaultValue={defaultAppliedRanges?.floorarea} label="Floor Area (sqm)" valueChangedCallback={(val) => onFilterValueChanged("floorarea", val)}/>
                        <FilterCheckbox label="Upgraded Facilities" defaultValue={defaultAppliedRanges?.upgraded_facilities} valueChangedCallback={(val) => onFilterValueChanged("upgraded_facilities", val)}/>
                    </>                    
                }
            </div>
            <Button onClick={performSearchCallback}>Apply Filters</Button>
        </form>
    );
}

export default PropertySearchFilter;