import {FunctionComponent} from "react";
import SharedServices from "../../SharedServices";
import {InsertLineWidget} from "./InsertLineWidget";
import {EditLineWidget} from "./EditLineWidget";
import {Button} from "../../visual/widgets/buttons/Button";
import DataObjectState from "../../data/dataObject/DataObjectState";
import DataObject from "../../data/dataObject/DataObject";

interface properties {
    sharedServices:SharedServices;
    selectedEntryState:DataObjectState;
    exampleObject?:DataObject<any>;
}

export const ProcessLineWidget: FunctionComponent<properties> = ({ sharedServices, selectedEntryState, exampleObject}) => {

    const backButton = <Button enabled={true} label={"Назад"} onClick={sharedServices.navigation?.retreat}/>
    const insertWidget = <InsertLineWidget sharedServices={sharedServices} exampleObject={exampleObject}/>;
    const editWidget = <EditLineWidget sharedServices={sharedServices} selectedEntryState={selectedEntryState}/>;

    return <>
        {backButton}
        <br/><br/>
        {selectedEntryState.isEmpty() ? insertWidget : editWidget}
    </>
}