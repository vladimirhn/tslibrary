import SharedServices from "../../SharedServices";
import {FunctionComponent} from "react";
import DataObject from "../../data/dataObject/DataObject";
import {ProcessLineForm} from "./ProcessLineForm";
import DataObjectState from "../../data/dataObject/DataObjectState";

interface properties {
    sharedServices:SharedServices;
    selectedEntryState:DataObjectState;
}

export const EditLineWidget: FunctionComponent<properties> = ({ sharedServices, selectedEntryState}) => {

    const selectedEntry:DataObject<any> | undefined = sharedServices.repository?.dataSet.oneSelectedEntry;

    const save = () => {
        sharedServices.repository?.update(selectedEntryState.getDataObject());
        sharedServices.repository?.dataSet.dropOneSelection();
        sharedServices.navigation?.home();
    }

    if (!sharedServices.repository?.objectDescription) {
        console.log("sharedServices.repository?.objectDescription is undefined. Cannot make default edit line form.")
        return null;
    }

    return <ProcessLineForm
        objectDescription={sharedServices.repository?.objectDescription}
        exampleObjectState={selectedEntryState}
        applyButtonLabel={"сохранить"}
        applyButtonFunct={save}
    />

    return null;
}