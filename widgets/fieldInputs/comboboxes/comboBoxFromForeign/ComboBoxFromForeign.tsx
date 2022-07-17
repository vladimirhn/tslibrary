import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import {ComboBoxEntryOption} from "./ComboBoxEntryOption";
import {ComboBoxEmptyOption} from "../ComboBoxEmptyOption";
import Symbols from "../../../../misc/Symbols";
import DataObject from "../../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Runnable from "../../../../functions/interfaces/Runnable";
import Repository from "../../../../data/backend/Repository";
import Class from "../../../../reflection/Class";
import {ComboBoxFromRepository} from "../ComboBoxFromRepository";

interface properties {
    exampleObject:DataObject<any>;
    fieldDescription:ObjectFieldDescription;
    isInline:boolean;
    onChoice:Runnable;
}

export const ComboBoxFromForeign: FunctionComponent<properties> = ({ exampleObject, fieldDescription, isInline, onChoice }) => {

    const dataObjectClass = (fieldDescription as unknown as Class<any>).foreignModel;

    const [foreignRepository, setRepository] = useState<Repository<any>>(Repository.empty(dataObjectClass));

    useEffect(() => {
        foreignRepository.initialFetchAll(setRepository);
    }, [])


    const processChoice = (selectedEntry:DataObject<any> | undefined) => {
        exampleObject.data?.setValueByField(fieldDescription, selectedEntry?.data?.id);
        if (onChoice) onChoice();
    }

    return <ComboBoxFromRepository
        label={fieldDescription.label}
        repository={foreignRepository}
        consumeChoice={processChoice}
        isInline={isInline}
        hideIfEmpty={false}
    />
}