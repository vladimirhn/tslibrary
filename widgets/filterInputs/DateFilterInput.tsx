import DataType from "../../data/dataObject/DataType";
import React, {FunctionComponent} from "react";
import Repository from "../../data/backend/Repository";
import Consumer from "../../functions/interfaces/Consumer";
import ObjectFieldDescription from "../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataObject from "../../data/dataObject/DataObject";

interface properties {
    exampleObject:DataObject<any>;
    fieldDescription:ObjectFieldDescription;
}

export const DateFilterInput: FunctionComponent<properties> = ({ exampleObject, fieldDescription }) => {

    if (fieldDescription.type !== DataType.DATE) {
        throw Error("Wrong data type! DateInput supports DataType.DATE fields only.");
    }

    const value:string = exampleObject.data?.getDefinedValueByField(fieldDescription) || "";

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <input type="date"
                   value={value}
                   onChange={e => exampleObject.data?.setValueByField(fieldDescription, e.target.value)}/>
        </div>
        <button
            onClick={() => {exampleObject.data?.setValueByField(fieldDescription, undefined)}}
            disabled={!value}
        >x</button>
    </div>
}