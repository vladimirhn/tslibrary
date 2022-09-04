import React, {FunctionComponent} from "react";
import DataObjectState from "../../../data/dataObject/DataObjectState";
import ObjectFieldDescription from "../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";

interface properties {
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
}

export const DataObjectNumericInput: FunctionComponent<properties> = ({exampleObjectState, fieldDescription}) => {

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <input type="number" placeholder="0" min="0" step="1"
                   className="five-em-input"
                   value={exampleObjectState.getValue(fieldDescription) || ""}
                   onChange={(e) => {exampleObjectState.setValue(fieldDescription, e.target.value)}}/>
        </div>
    </div>
}