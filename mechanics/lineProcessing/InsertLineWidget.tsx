import SharedServices from "../../SharedServices";
import {FunctionComponent, useEffect, useState} from "react";
import DataObjectState from "../../data/dataObject/DataObjectState";
import DataObject from "../../data/dataObject/DataObject";
import {ProcessLineForm} from "./ProcessLineForm";

interface properties {
    sharedServices:SharedServices;
    exampleObject?:DataObject<any>;
}

export const InsertLineWidget: FunctionComponent<properties> = ({ sharedServices, exampleObject}) => {

    const exampleObjectState:DataObjectState = new DataObjectState(useState<DataObject<any>>(exampleObject || DataObject.empty));
    useEffect(() => {

        //TODO: init default dates

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const save = () => {
        sharedServices.repository?.insert(exampleObjectState.getDataObject());
        exampleObjectState.eraseObject();
        sharedServices.navigation?.home();
    }

    if (!sharedServices.repository?.objectDescription) {
        console.log("sharedServices.repository?.objectDescription is undefined. Cannot make default insert line form.")
        return null;
    }

    return <ProcessLineForm
        objectDescription={sharedServices.repository?.objectDescription}
        exampleObjectState={exampleObjectState}
        applyButtonLabel={"сохранить"}
        applyButtonFunct={save}
    />
}