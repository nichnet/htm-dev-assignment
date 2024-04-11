import { useEffect, useState } from "react";

import './Filter.css';

function FilterCheckbox({label, defaultValue, valueChangedCallback}) {

    const [isChecked, setIsChecked] = useState(defaultValue ?? false);

    useEffect(()=>{
        console.log(isChecked, defaultValue);
    }, []);

    useEffect(() => {
        if(valueChangedCallback) {
            valueChangedCallback(isChecked);   
        }
    }, [isChecked]);

    return(
        <div className="filter">
            <label>
                <input type="checkbox" defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                <span>{label}</span>
            </label>
        </div>
    );
}

export default FilterCheckbox;