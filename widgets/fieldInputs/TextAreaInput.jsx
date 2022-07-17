import React from 'react';
import DataType from "../../data/dataObject/DataType";

export default function TextAreaInput({fieldDescription, fieldsProcessor}) {
    if (fieldDescription.type !== DataType.STRING) {
        throw Error("Wrong data type! TextAreaInput supports DataType.STRING fields only.");
    }

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <textarea
                value={fieldsProcessor.getDefinedValue(fieldDescription)}
                onChange={e => fieldsProcessor.setValue(fieldDescription, e.target.value)} />
        </div>
    </div>
}