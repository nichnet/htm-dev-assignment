import { useEffect, useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import './Filter.css';

function FilterRange({clampedRange, defaultValue, label,valueChangedCallback}) {

    const [isChecked, setIsChecked] = useState(defaultValue  ? true : false);
    const [currentRangeValue, setCurrentRangeValue] = useState(defaultValue ?? clampedRange ?? [1, 1]); 

    useEffect(() => {
        if(valueChangedCallback) {
            valueChangedCallback(isChecked ? currentRangeValue : null);   
        }
    }, [isChecked, currentRangeValue]);

    return(
        <div className="filter">
            <label>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                <span>({`${label} ${currentRangeValue?.[0]} - ${currentRangeValue?.[1]}`})</span>
            </label>
            <br/>
            <Slider range dotStyle={{backgroundColor: "red"}} style={{marginTop: "6px"}} steps={1} disabled={!isChecked} min={clampedRange[0]} max={clampedRange[1]} defaultValue={defaultValue ?? clampedRange} onChange={(range) => setCurrentRangeValue(range)}/>
        </div>
    );
}

export default FilterRange;