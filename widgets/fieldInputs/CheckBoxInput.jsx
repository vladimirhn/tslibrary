import DataType from "../../data/dataObject/DataType";
import React from "react";

export default function CheckBoxInput({fieldDescription, fieldProcessor}) {
    if (fieldDescription.type !== DataType.BOOLEAN) {
        throw Error("Wrong data type! CheckBoxInput supports DataType.BOOLEAN fields only.");
    }

    let value = !!fieldProcessor.getValue(fieldDescription);

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <input type="checkbox"
                   checked={value}
                   onChange={e => fieldProcessor.setValue(fieldDescription, !value)}/>
        </div>
    </div>
}