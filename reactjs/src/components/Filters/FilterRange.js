import { useEffect, useState } from "react";

import './Filter.css';

function FilterRange({min=0, max=1, label, defaultState=false, valueChangedCallback}) {

    const [isChecked, setIsChecked] = useState(true);
    const [rangeValue, setRangeValue] = useState(max);

    useEffect(() => {
        setIsChecked(defaultState);
    }, []);

    useEffect(() => {
        setRangeValue(max);
    }, [max]);

    useEffect(() => {
        if(valueChangedCallback) {
            valueChangedCallback(isChecked ? rangeValue : null);   
        }
    }, [isChecked, rangeValue]);

    return(
        <div className="filter">
            <label>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                <span>{label} ({rangeValue})</span>
                <br/>
                <input type="range" disabled={!isChecked} min={min} max={max} value={rangeValue} onChange={e => setRangeValue(e.target.value)}/>
            </label>
        </div>
    );
}

export default FilterRange;