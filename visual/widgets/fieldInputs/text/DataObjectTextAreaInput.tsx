import React, {FunctionComponent} from "react";
import DataObjectState from "../../../../data/dataObject/DataObjectState";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import {InlineLayout} from "../../layouts/InlineLayout";

interface properties {
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
}

export const DataObjectTextAreaInput: FunctionComponent<properties> = ({exampleObjectState, fieldDescription}) => {

    const label:string = fieldDescription.label;
    const value:string = exampleObjectState.getDataObject().data?.getValueByField(fieldDescription) || "";

    const labelWidget = <>{label}</>

    const widget:JSX.Element = <textarea
        value={value}
        onChange={(e) => {exampleObjectState.setValue(fieldDescription, e.target.value)}}
    />

    return <InlineLayout widgets={[labelWidget, widget]} defaultWidth={200}/>
}