import React, {FunctionComponent, useState} from "react";
import Button from "../../../buttons/Button";
import DataType from "../../../../data/dataObject/DataType";
import {DateFilterInput} from "../../../filterInputs/DateFilterInput";
import {ChooseFromTablePopupWidget} from "../../../fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import {ComboBoxFromMapObject} from "../../../fieldInputs/comboboxes/comboBoxFromMapObject/ComboBoxFromMapObject";
import Repository from "../../../../data/backend/Repository";
import Consumer from "../../../../functions/interfaces/Consumer";
import DataObject from "../../../../data/dataObject/DataObject";
import TableConfig from "../TableConfig";

interface properties {
    repository:Repository<any>;
    toggleVisibilityFunct:Consumer<any>
}

export const ManagementPanelFiltersWidget: FunctionComponent<properties> = ({ repository, toggleVisibilityFunct }) => {

    const [exampleObject, ] = useState<DataObject<any>>(new DataObject());

    const applyFilterButton = <Button
        funct={() => {repository.fetchFiltered(exampleObject); toggleVisibilityFunct()}}
        label={"Применить фильтры"}
        enabled={!exampleObject.data?.isDataFieldsEmpty()}
    />

    const filterWidgets = repository.objectDescription?.filterFieldsDescriptions.map((filterFieldDescription, index) => {

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

            return <ChooseFromTablePopupWidget
                key={index}
                config={new TableConfig().noDelete()}
                exampleObject={exampleObject}
                fieldDescription={filterFieldDescription}
                // repository={repository}
            />;
        }
        else if (filterFieldDescription.type === DataType.MAP) {

            return <ComboBoxFromMapObject
                key={index}
                exampleObject={exampleObject}
                fieldDescription={filterFieldDescription}
                noEmpty={true}
                isInline={false}
                onChoice={() => repository.fetchFiltered(exampleObject)}
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