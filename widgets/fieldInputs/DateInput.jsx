import DataType from "../../data/dataObject/DataType";
import React from "react";

export default function DateInput({fieldDescription, fieldsProcessor}) {
    if (fieldDescription.type !== DataType.DATE) {
        throw Error("Wrong data type! DateInput supports DataType.DATE fields only.");
    }

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <input type="date"
                   value={fieldsProcessor.getDefinedValue(fieldDescription)}
                   onChange={e => fieldsProcessor.setValue(fieldDescription, e.target.value)}/>
        </div>
    </div>
}