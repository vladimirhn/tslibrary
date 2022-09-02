import React, {FunctionComponent, useEffect, useState} from "react";
import Popup from "../../popup/Popup";
import {ChooseFromTableResultWidget} from "./ChooseFromTableResultWidget";
import DropValueOptionWidget from "./DropValueOptionWidget";
import Repository from "../../../data/backend/Repository";
import TableConfig from "../../tables/dataSetTable/TableConfig";
import DataObject from "../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import {DataSetTable} from "../../tables/dataSetTable/DataSetTable";
import DataObjectState from "../../../data/dataObject/DataObjectState";

interface properties {
    config:TableConfig;
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
}

export const ChooseFromTablePopupWidget: FunctionComponent<properties> = ({ config, exampleObjectState, fieldDescription }) => {

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
    }

    const dropSelection = () => {
        setIsOpen(false);
        exampleObjectState.setValue(fieldDescription, undefined);
    }

    return <>

        <ChooseFromTableResultWidget
            label={fieldDescription.label}
            name={name}
            repository={repository}
            togglePopup={togglePopup}
            isInline={true}
        />

        {isOpen && <Popup
            content={<>
                {id && <DropValueOptionWidget
                    value={name}
                    dropFunct={dropSelection}
                />}
                <DataSetTable
                    repository={repository}
                    config={new TableConfig().inlineFilters().noDelete()}
                    onChoice={applySelection}
                />
            </>}
            handleClose={togglePopup}
        />}

    </>
}