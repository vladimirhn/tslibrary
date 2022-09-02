import React, {FunctionComponent, useEffect, useState} from "react";
import DataObject from "../../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Runnable from "../../../../functions/interfaces/Runnable";
import Repository from "../../../../data/backend/Repository";
import Class from "../../../../reflection/Class";
import {ComboBoxFromRepository} from "../ComboBoxFromRepository";
import DataObjectState from "../../../../data/dataObject/DataObjectState";

interface properties {
    exampleObjectState:DataObjectState;
    fieldDescription:ObjectFieldDescription;
    isInline:boolean;
    onChoice:Runnable;
}

export const ComboBoxFromForeign: FunctionComponent<properties> = ({ exampleObjectState, fieldDescription, isInline, onChoice }) => {

    const dataObjectClass = (fieldDescription as unknown as Class<any>).foreignModel;

    const [foreignRepository, setRepository] = useState<Repository<any>>(Repository.empty(dataObjectClass));

    useEffect(() => {
        foreignRepository.initialFetchAll(setRepository);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const processChoice = (selectedEntry:DataObject<any> | undefined) => {
        exampleObjectState.setValue(fieldDescription, selectedEntry?.data?.id);
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