import React, {FunctionComponent, useState} from "react";
import {Button} from "../../../buttons/Button";
import DataType from "../../../../data/dataObject/DataType";
import {DataObjectDateInput} from "../../../fieldInputs/dates/DataObjectDateInput";
import {ChooseFromTablePopupWidget} from "../../../fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import {ComboBoxFromMapObject} from "../../../fieldInputs/comboboxes/comboBoxFromMapObject/ComboBoxFromMapObject";
import Repository from "../../../../data/backend/Repository";
import Consumer from "../../../../functions/interfaces/Consumer";
import DataObject from "../../../../data/dataObject/DataObject";
import TableConfig from "../TableConfig";
import DataObjectState from "../../../../data/dataObject/DataObjectState";

interface properties {
    repository:Repository<any>;
    toggleVisibilityFunct:Consumer<any>
}

export const ManagementPanelFiltersWidget: FunctionComponent<properties> = ({ repository, toggleVisibilityFunct }) => {

    const exampleObjectState:DataObjectState = new DataObjectState(useState<DataObject<any>>(DataObject.empty));

    const applyFilterButton = <Button
        onClick={() => {repository.fetchFiltered(exampleObjectState.getDataObject()); toggleVisibilityFunct()}}
        label={"Применить фильтры"}
        enabled={!exampleObjectState.getDataObject().data?.isDataFieldsEmpty()}
    />

    const filterWidgets = repository.objectDescription?.filterFieldsDescriptions.map((filterFieldDescription, index) => {

        if (filterFieldDescription.type === DataType.DATE) {

            return <DataObjectDateInput
                key={index}
                exampleObjectState={exampleObjectState}
                fieldDescription={filterFieldDescription}
            />
        }
        else if (filterFieldDescription.type === DataType.BOOLEAN) {
            return null;
        }
        else if (filterFieldDescription.type === DataType.FOREIGN_ID) {

            return <ChooseFromTablePopupWidget
                key={index}
                config={new TableConfig().noDelete()}
                exampleObjectState={exampleObjectState}
                fieldDescription={filterFieldDescription}
            />;
        }
        else if (filterFieldDescription.type === DataType.MAP) {

            return <ComboBoxFromMapObject
                key={index}
                exampleObjectState={exampleObjectState}
                fieldDescription={filterFieldDescription}
                noEmpty={true}
                isInline={false}
                onChoice={() => repository.fetchFiltered(exampleObjectState.getDataObject())}
            />;
        }

        return null;
    });

    return <div className={"widget"}>
        Фильтры:<br/>
        {filterWidgets}
        {applyFilterButton}
    </div>
}