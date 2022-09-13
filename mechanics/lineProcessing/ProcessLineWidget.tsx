import {FunctionComponent, useState} from "react";
import SharedServices from "../../SharedServices";
import {InsertLineWidget} from "./InsertLineWidget";
import {EditLineWidget} from "./EditLineWidget";
import {Button} from "../../visual/widgets/buttons/Button";
import DataObjectState from "../../data/dataObject/DataObjectState";
import DataObject from "../../data/dataObject/DataObject";


interface properties {
    sharedServices:SharedServices;
    selectedEntryState?:DataObjectState;
    exampleObject?:DataObject<any>;
}

export const ProcessLineWidget: FunctionComponent<properties> = ({ sharedServices, selectedEntryState, exampleObject}) => {

    const innerSelectedEntryState:DataObjectState = new DataObjectState(useState<any>(sharedServices.repository?.dataSet.oneSelectedEntry));

    const backButton = <Button enabled={true} label={"Назад"} onClick={sharedServices.navigation?.retreat}/>
    const insertWidget = <InsertLineWidget sharedServices={sharedServices} exampleObject={exampleObject}/>;
    const editWidget = <EditLineWidget sharedServices={sharedServices} selectedEntryState={selectedEntryState && !selectedEntryState?.isEmpty() ? selectedEntryState : innerSelectedEntryState}/>;

    let widget;

    if (selectedEntryState && !selectedEntryState?.isEmpty()) {
        widget = editWidget

    } else if (!innerSelectedEntryState.isEmpty()) {
        widget = editWidget;

    } else {
        widget = insertWidget;
    }

    return <>
        {backButton}
        <br/><br/>
        {widget}
    </>
}