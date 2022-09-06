import React, {FunctionComponent} from "react";
import {ComboBoxEmptyOption} from "../ComboBoxEmptyOption";
import {ComboBoxIdLabelOption} from "./ComboBoxIdLabelOption";
import ObjectFieldDescription from "../../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Runnable from "../../../../../functions/interfaces/Runnable";
import Symbols from "../../../../../misc/Symbols";
import DataObjectState from "../../../../../data/dataObject/DataObjectState";

interface properties {
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
    noEmpty:boolean;
    isInline:boolean;
    onChoice:Runnable;
}

export const ComboBoxFromMapObject: FunctionComponent<properties> = ({exampleObjectState,
                                                                         fieldDescription,
                                                                         noEmpty ,
                                                                         isInline,
                                                                         onChoice}) => {

    const variants = fieldDescription.valuesMap;

    const options = [];
    let i = 0;

    if (!noEmpty) {
        options.push(<ComboBoxEmptyOption key={-1}/>)
    }

    for (let field in variants) {
        options.push(
            <ComboBoxIdLabelOption
                key={i++}
                id={field}
                label={variants[field]}
            />
        )
    }

    let id = exampleObjectState.getValue(fieldDescription) || "";

    return <div className={isInline ? "inline" : ""}>
        <div className={isInline ? "inline" : "inline-200-px"}>{fieldDescription.label}{Symbols.SPACE}️</div>
        <div className={isInline ? "inline" : "inline-200-px"}>

            <select
                onChange={(e) => {exampleObjectState.setValue(fieldDescription, e.target.value); onChoice();}}
                value={id}
                style={{minWidth:'200px'}}>
                {options}
            </select>

        </div>
    </div>
}