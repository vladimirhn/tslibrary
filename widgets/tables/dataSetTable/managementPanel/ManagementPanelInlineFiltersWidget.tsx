import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import DataType from "../../../../data/dataObject/DataType";
import {DateFilterInput} from "../../../filterInputs/DateFilterInput";
import {ComboBoxFromMapObject} from "../../../fieldInputs/comboboxes/comboBoxFromMapObject/ComboBoxFromMapObject";
import Symbols from "../../../../misc/Symbols";
import {ComboBoxFromForeign} from "../../../fieldInputs/comboboxes/comboBoxFromForeign/ComboBoxFromForeign";
import DataObject from "../../../../data/dataObject/DataObject";
import Repository from "../../../../data/backend/Repository";

interface properties {
    repository:Repository<any>;
}

export const ManagementPanelInlineFiltersWidget: FunctionComponent<properties> = ({ repository }) => {

    const [exampleObject, ] = useState<DataObject<any>>(DataObject.empty);

    const filterWidgets = repository.dataSet.objectDescription?.filterFieldsDescriptions.map((filterFieldDescription, index) => {

        if (filterFieldDescription.type === DataType.DATE) {

            return <DateFilterInput
                key={index}
                exampleObject={exampleObject}
                fieldDescription={filterFieldDescription}
            />
        }
        else if (filterFieldDescription.type === DataType.BOOLEAN) {
            return null;
        }
        else if (filterFieldDescription.type === DataType.FOREIGN) {

            return <ComboBoxFromForeign
                key={index}
                exampleObject={exampleObject}
                fieldDescription={filterFieldDescription}
                isInline={true}
                onChoice={() => {repository.fetchFiltered(exampleObject)}}
            />;
        }
        else if (filterFieldDescription.type === DataType.MAP) {

            return <ComboBoxFromMapObject
                key={index}
                exampleObject={exampleObject}
                fieldDescription={filterFieldDescription}
                noEmpty={false}
                isInline={true}
                onChoice={() => {repository.fetchFiltered(exampleObject)}}
            />;
        }

        return null;
    });

    return <div style={{display: "inline"}}>
        {Symbols.SPACE}🌪{Symbols.SPACE}️
        {filterWidgets}
    </div>
}