import React, {FunctionComponent} from "react";

interface properties {
    id:string | undefined;
    label:string | undefined;
}

export const ComboBoxIdLabelOption: FunctionComponent<properties> = ({ id, label }) => {

    return <option value={id}>
        {label}
    </option>
 }