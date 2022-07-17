import React from 'react';
import DataType from "../../data/dataObject/DataType";

export default function NumericInput({fieldDescription, fieldsProcessor}) {
    if (fieldDescription.type !== DataType.NUMERIC) {
        throw Error("Wrong data type! NumericInput supports DataType.NUMERIC fields only.");
    }

    return <div className="wrapper">
        <div className="inline-200-px">{fieldDescription.label}</div>
        <div className="inline-200-px">
            <input type="number" placeholder="0" min="0" step="1"
                   className="five-em-input"
                   value={fieldsProcessor.getDefinedValue(fieldDescription)}
                   onChange={e => fieldsProcessor.setValue(fieldDescription, e.target.value)}/>
        </div>
    </div>
}