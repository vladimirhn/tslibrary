import React, {FunctionComponent} from "react";
import DataObjectState from "../../data/dataObject/DataObjectState";
import Runnable from "../../functions/interfaces/Runnable";
import ObjectDescription from "../../data/backend/ObjectDescription";
import DataType from "../../data/dataObject/DataType";
import {DataObjectTextInput} from "../../visual/widgets/fieldInputs/text/DataObjectTextInput";
import {Button} from "../../visual/widgets/buttons/Button";

interface properties {
    objectDescription:ObjectDescription<any>;
    exampleObjectState:DataObjectState;
    applyButtonLabel:string;
    applyButtonFunct:Runnable;
}

export const ProcessLineForm: FunctionComponent<properties> = ({ objectDescription, exampleObjectState, applyButtonLabel, applyButtonFunct}) => {

    const widgets:Array<JSX.Element | undefined> = objectDescription
        .fieldsDescriptions.map((fieldDescription, index) => {

            if (!fieldDescription.isId) {

                if (fieldDescription.type === DataType.STRING) {

                    return <DataObjectTextInput
                        key={index}
                        exampleObjectState={exampleObjectState}
                        fieldDescription={fieldDescription}
                    />
                }
            }
    });

    const saveButton = <Button enabled={true} label={applyButtonLabel} onClick={applyButtonFunct}/>;

    return <>
        {widgets}
        <br/><br/>
        {saveButton}
    </>
}