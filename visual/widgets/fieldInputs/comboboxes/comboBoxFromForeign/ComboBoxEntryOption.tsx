import React, {FunctionComponent} from "react";
import DataObject from "../../../../../data/dataObject/DataObject";

interface properties {
    entry:DataObject<any>
}

export const ComboBoxEntryOption: FunctionComponent<properties> = ({entry}) => {

    return <option value={entry.data?.id}>
        {entry.mainFieldData}
    </option>
 }