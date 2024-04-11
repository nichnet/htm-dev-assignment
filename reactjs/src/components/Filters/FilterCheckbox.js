import { useEffect, useState } from "react";

import './Filter.css';

function FilterCheckbox({label, defaultState=false, valueChangedCallback}) {

    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        setIsChecked(defaultState);
    }, []);

    useEffect(() => {
        if(valueChangedCallback) {
            valueChangedCallback(isChecked);   
        }
    }, [isChecked]);

    return(
        <div className="filter">
            <label>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                <span>{label}</span>
            </label>
        </div>
    );
}

export default FilterCheckbox;