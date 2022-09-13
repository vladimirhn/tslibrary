import React, {FunctionComponent, useEffect, useState} from "react";
import Popup from "../../popup/Popup";
import {ChooseFromTableResultWidget} from "./ChooseFromTableResultWidget";
import DropValueOptionWidget from "./DropValueOptionWidget";
import Repository from "../../../../data/backend/Repository";
import TableConfig from "../../tables/dataSetTable/TableConfig";
import DataObject from "../../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import {DataSetTableWidget} from "../../tables/dataSetTable/DataSetTableWidget";
import DataObjectState from "../../../../data/dataObject/DataObjectState";
import Consumer from "../../../../functions/interfaces/Consumer";

interface properties {
    config:TableConfig;
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
    dataObjectConsumer?:Consumer<DataObject<any>>;
}

export const ChooseFromTablePopupWidget: FunctionComponent<properties> = ({ config, exampleObjectState,
                                                                            fieldDescription ,dataObjectConsumer}) => {

    const [repository, setRepository] = useState<Repository<any>>(Repository.empty(fieldDescription.foreignModel));

    useEffect(() => {
        repository.initialFetchAll(setRepository);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    let id:string = exampleObjectState.getValue(fieldDescription) || "";
    let name = repository.dataSet.findMainFieldDataById(id);

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const applySelection = (entry:DataObject<any>) => {
        setIsOpen(false);
        exampleObjectState.setValue(fieldDescription, entry.data?.id);
        if (dataObjectConsumer) dataObjectConsumer(entry);
    }

    const dropSelection = () => {
        setIsOpen(false);
        exampleObjectState.setValue(fieldDescription, undefined);
        if (dataObjectConsumer) dataObjectConsumer(undefined);
    }

    return <>

        <ChooseFromTableResultWidget
            label={fieldDescription.label}
            name={name}
            repository={repository}
            togglePopup={togglePopup}
            isInline={config.inlineFilters}
        />

        {isOpen && <Popup
            content={<>
                {id && <DropValueOptionWidget
                    value={name}
                    dropFunct={dropSelection}
                />}
                <DataSetTableWidget
                    repository={repository}
                    config={new TableConfig().useInlineFilters().noDelete().onSelectionFunc(applySelection)}
                />
            </>}
            handleClose={togglePopup}
        />}

    </>
}