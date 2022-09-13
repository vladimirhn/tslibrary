import React, {FunctionComponent} from "react";
import Data from "../../../../data/dataObject/Data";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import {InlineLayout} from "../../layouts/InlineLayout";

interface properties {
    data:Data<any>;
    field:ObjectFieldDescription;
    label?:string;
}

export const TextInput: FunctionComponent<properties> = ({data, field, label}) => {

    label = label? label : field.label;
    const labelWidget = <>{label}</>

    let widget:JSX.Element = <input
        value={data.getValueByField(field) || ""}
        onChange={(e) => {data.setValueByField(field, e.target.value)}}
    />

    return <InlineLayout widgets={[labelWidget, widget]} defaultWidth={200}/>
}