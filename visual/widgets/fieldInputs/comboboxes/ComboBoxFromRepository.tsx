import React, {FunctionComponent} from "react";
import Repository from "../../../../data/backend/Repository";
import {ComboBoxEmptyOption} from "./ComboBoxEmptyOption";
import {ComboBoxEntryOption} from "./comboBoxFromForeign/ComboBoxEntryOption";
import Consumer from "../../../../functions/interfaces/Consumer";
import Symbols from "../../../../misc/Symbols";
import DataObject from "../../../../data/dataObject/DataObject";
import {RepositoryState} from "../../../../data/backend/RepositoryState";


interface properties {
    label:string;
    repository:Repository<any>;
    consumeChoice:Consumer<DataObject<any>>;
    isInline:boolean;
    hideIfEmpty:boolean
}

export const ComboBoxFromRepository: FunctionComponent<properties> = ({ label, repository , consumeChoice, isInline, hideIfEmpty}) => {

    if (hideIfEmpty && repository.dataSet.size === 0) return null;

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

    if (repository.state === RepositoryState.FETCHING_DATA) fetchingWidget = <span>загрузка данных</span>;

    return <div className={isInline ? "inline" : ""}>
        <div className={isInline ? "inline" : "inline-200-px"}>{label}{Symbols.SPACE}️</div>
        <div className={isInline ? "inline" : "inline-200-px"}>
            {fetchingWidget || comboBoxWidget}
        </div>
    </div>
}