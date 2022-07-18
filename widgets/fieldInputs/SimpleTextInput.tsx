import React, {FunctionComponent} from "react";
import Data from "../../data/dataObject/Data";
import ObjectFieldDescription from "../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import {InputLayout} from "./InputsLayout";
import Consumer from "../../functions/interfaces/Consumer";

interface properties {
    label?:string;
    value:string;
    setter:Consumer<any>;
}

export const SimpleTextInput: FunctionComponent<properties> = ({label, value, setter}) => {

    let widget:JSX.Element = <input
        value={value || ""}
        onChange={(e) => {setter(e.target.value)}}
    />

    return <InputLayout label={label} widget={widget}/>
}