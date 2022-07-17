import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import Popup from "../../popup/Popup";
import {ChooseFromTableResultWidget} from "./ChooseFromTableResultWidget";
import DropValueOptionWidget from "./DropValueOptionWidget";
import Repository from "../../../data/backend/Repository";
import TableConfig from "../../tables/dataSetTable/TableConfig";
import DataObject from "../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Domain from "../../../../application/domain/Domain";
import {DataSetTable} from "../../tables/dataSetTable/DataSetTable";

interface properties {
    // repository:Repository<any>;
    config:TableConfig;
    exampleObject:DataObject<any>;
    fieldDescription:ObjectFieldDescription;
}

export const ChooseFromTablePopupWidget: FunctionComponent<properties> = ({ /*repository,*/ config, exampleObject, fieldDescription }) => {

    const [repository, setRepository] = useState<Repository<any>>(Repository.empty(fieldDescription.foreignModel));

    useEffect(() => {
        repository.initialFetchAll(setRepository);
    }, [])


    let id:string = exampleObject.data?.getDefinedValueByField(fieldDescription) || "";
    let name = repository.dataSet.findMainFieldDataById(id);

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const applySelection = (entry:DataObject<any>) => {
        setIsOpen(false);
        exampleObject.data?.setValueByField(fieldDescription, entry.data?.id);
    }

    const dropSelection = () => {
        setIsOpen(false);
        exampleObject.data?.setValueByField(fieldDescription, undefined);
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
                    config={new TableConfig().inlineFilters()}
                />
            </>}
            handleClose={togglePopup}
        />}

    </>
}