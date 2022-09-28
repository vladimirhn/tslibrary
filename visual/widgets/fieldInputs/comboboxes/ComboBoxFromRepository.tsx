import React, {FunctionComponent} from "react";
import Repository from "../../../../data/backend/Repository";
import {ComboBoxEmptyOption} from "./ComboBoxEmptyOption";
import {ComboBoxEntryOption} from "./comboBoxFromForeign/ComboBoxEntryOption";
import Consumer from "../../../../functions/interfaces/Consumer";
import DataObject from "../../../../data/dataObject/DataObject";
import {FetchingState} from "../../../../data/backend/FetchingState";
import {InlineLayout} from "../../layouts/InlineLayout";


interface properties {
    label:string;
    repository:Repository<any>;
    consumeChoice:Consumer<DataObject<any>>;
    hideIfEmpty:boolean;
    selectedId?:string;
}

export const ComboBoxFromRepository: FunctionComponent<properties> = ({ label, repository , consumeChoice, hideIfEmpty, selectedId}) => {

    if (hideIfEmpty && repository.dataSet.size === 0) return null;
    if (selectedId) repository.dataSet.setSelectedById(selectedId);

    const options = [];
    let i = 0;

    options.push(<ComboBoxEmptyOption key={-1}/>)

    for (let entry of repository.dataSet.entriesArray) {
        options.push(
            <ComboBoxEntryOption
                key={i++}
                entry={entry}
            />
        )
    }

    const processChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if(!e.target.value) {
            repository.dataSet.dropSelection();
            consumeChoice(undefined);
            return;
        }

        const selectedId:string = e.target.value;
        const selectedEntry:DataObject<any> | undefined = repository.dataSet.getById(selectedId);

        if (selectedEntry) repository.dataSet.toggleOneSelection(selectedEntry);
        consumeChoice(selectedEntry);
    }

    let comboBoxWidget = <select
        onChange={processChoice}
        value={repository.dataSet.oneSelectedEntry?.data?.id || undefined}
        style={{minWidth: '200px'}}>
        {options}
    </select>

    let fetchingWidget = null;

    if (repository.state === FetchingState.FETCHING_DATA) fetchingWidget = <span>загрузка данных</span>;

    return <InlineLayout widgets={[<>{label}</>, fetchingWidget || comboBoxWidget]} defaultWidth={200}/>
}