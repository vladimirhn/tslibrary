import React, {FunctionComponent, useState} from "react";
import DataType from "../../../../data/dataObject/DataType";
import {DateFilterInput} from "../../../filterInputs/DateFilterInput";
import {ComboBoxFromMapObject} from "../../../fieldInputs/comboboxes/comboBoxFromMapObject/ComboBoxFromMapObject";
import Symbols from "../../../../misc/Symbols";
import {ComboBoxFromForeign} from "../../../fieldInputs/comboboxes/comboBoxFromForeign/ComboBoxFromForeign";
import DataObject from "../../../../data/dataObject/DataObject";
import Repository from "../../../../data/backend/Repository";
import DataObjectState from "../../../../data/dataObject/DataObjectState";

interface properties {
    repository:Repository<any>;
}

export const ManagementPanelInlineFiltersWidget: FunctionComponent<properties> = ({ repository }) => {

    const exampleObjectState:DataObjectState = new DataObjectState(useState<DataObject<any>>(DataObject.empty));

    const filterWidgets = repository.dataSet.objectDescription?.filterFieldsDescriptions.map((filterFieldDescription, index) => {

        if (filterFieldDescription.type === DataType.DATE) {

            return <DateFilterInput
                key={index}
                exampleObjectState={exampleObjectState}
                fieldDescription={filterFieldDescription}
            />
        }
        else if (filterFieldDescription.type === DataType.BOOLEAN) {
            return null;
        }
        else if (filterFieldDescription.type === DataType.FOREIGN_ID) {

            return <ComboBoxFromForeign
                key={index}
                exampleObjectState={exampleObjectState}
                fieldDescription={filterFieldDescription}
                isInline={true}
                onChoice={() => repository.fetchFiltered(exampleObjectState.getDataObject())}
            />;
        }
        else if (filterFieldDescription.type === DataType.MAP) {

            return <ComboBoxFromMapObject
                key={index}
                exampleObjectState={exampleObjectState}
                fieldDescription={filterFieldDescription}
                noEmpty={false}
                isInline={true}
                onChoice={() => {repository.fetchFiltered(exampleObjectState.getDataObject())}}
            />;
        }

        return null;
    });

    return <div style={{display: "inline"}}>
        {Symbols.SPACE}🌪{Symbols.SPACE}️
        {filterWidgets}
    </div>
}