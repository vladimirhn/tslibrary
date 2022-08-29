import React, {FunctionComponent} from "react";
import Consumer from "../../functions/interfaces/Consumer";

interface properties {
    label?:string;
    value:string;
    setter:Consumer<any>;
}

export const SimpleNumericInput: FunctionComponent<properties> = ({label, value, setter}) => {

    return <div className="wrapper">
        <div className="inline-200-px">{label}</div>
        <div className="inline-200-px">
            <input type="number" placeholder="0" min="0" step="1"
                   className="five-em-input"
                   value={value || ""}
                   onChange={(e) => {setter(e.target.value)}}/>
        </div>
    </div>
}