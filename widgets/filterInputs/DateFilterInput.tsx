import DataType from "../../data/dataObject/DataType";
import React, {FunctionComponent} from "react";
import Repository from "../../data/backend/Repository";
import Consumer from "../../functions/interfaces/Consumer";
import ObjectFieldDescription from "../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataObject from "../../data/dataObject/DataObject";
import DataObjectState from "../../data/dataObject/DataObjectState";

interface properties {
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
}

export const DateFilterInput: FunctionComponent<properties> = ({ exampleObjectState, fieldDescription }) => {

    if (fieldDescription.type !== DataType.DATE) {
        throw Error("Wrong data type! DateInput supports DataType.DATE fields only.");
    }

    const value:string = exampleObjectState.getValue(fieldDescription) || "";

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <input type="date"
                   value={value}
                   onChange={e => exampleObjectState.setValue(fieldDescription, e.target.value)}/>
        </div>
        <button
            onClick={() => {exampleObjectState.setValue(fieldDescription, undefined)}}
            disabled={!value}
        >x</button>
    </div>
}