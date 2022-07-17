import React, {FunctionComponent} from "react";
import {ComboBoxEmptyOption} from "../ComboBoxEmptyOption";
import {ComboBoxIdLabelOption} from "./ComboBoxIdLabelOption";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataObject from "../../../../data/dataObject/DataObject";
import Runnable from "../../../../functions/interfaces/Runnable";
import Symbols from "../../../../misc/Symbols";

interface properties {
    exampleObject:DataObject<any>;
    fieldDescription:ObjectFieldDescription;
    noEmpty:boolean;
    isInline:boolean;
    onChoice:Runnable;
}

export const ComboBoxFromMapObject: FunctionComponent<properties> = ({exampleObject,
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

    let id = exampleObject.data?.getDefinedValueByField(fieldDescription);

    return <div className={isInline ? "inline" : ""}>
        <div className={isInline ? "inline" : "inline-200-px"}>{fieldDescription.label}{Symbols.SPACE}️</div>
        <div className={isInline ? "inline" : "inline-200-px"}>

            <select
                onChange={(e) => {exampleObject.data?.setValueByField(fieldDescription, e.target.value); onChoice();}}
                value={id}
                style={{minWidth:'200px'}}>
                {options}
            </select>

        </div>
    </div>
}