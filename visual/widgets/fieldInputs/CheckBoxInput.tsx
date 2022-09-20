import DataType from "../../../data/dataObject/DataType";
import React, {FunctionComponent} from "react";
import DataObjectState from "../../../data/dataObject/DataObjectState";
import ObjectFieldDescription from "../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import {InlineLayout} from "../layouts/InlineLayout";


interface properties {
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
}

export const CheckBoxInput: FunctionComponent<properties> = ({exampleObjectState, fieldDescription}) => {

    if (fieldDescription.type !== DataType.BOOLEAN) {
        throw Error("Wrong data type! CheckBoxInput supports DataType.BOOLEAN fields only.");
    }

    const label:string = fieldDescription.label;
    const value:boolean = !!exampleObjectState.getDataObject().data?.getValueByField(fieldDescription);

    const labelWidget = <>{label}</>

    const widget: JSX.Element =
        <input type="checkbox"
               checked={value}
               onChange={(e) => { exampleObjectState.setValue(fieldDescription, !value) }}
        />

    return <InlineLayout widgets={[labelWidget, widget]} defaultWidth={200}/>
}