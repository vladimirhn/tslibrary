import React, {FunctionComponent} from "react";
import Symbols from "../../../misc/Symbols";
import Repository from "../../../data/backend/Repository";
import Runnable from "../../../functions/interfaces/Runnable";
import {RepositoryState} from "../../../data/backend/RepositoryState";

interface properties {
    repository:Repository<any>;
    label:string;
    name:string;
    togglePopup:Runnable
    isInline:boolean;
}

export const ChooseFromTableResultWidget: FunctionComponent<properties> = ({ label, name, repository, togglePopup, isInline }) => {

    let choiceLabel = name || "выбрать";

    let widget = repository.state === RepositoryState.FETCHING_DATA ?
        <span>загрузка данных</span>
        :
        <div className={isInline ? "inline" : "inline-200-px"}
             style={{textDecoration: "underline #32557f dashed"}}
             onClick={togglePopup}
        >{choiceLabel}</div>

    return <div className={isInline ? "inline" : ""}>
        <div className={isInline ? "inline" : "inline-200-px"}>{label}:{Symbols.SPACE}</div>

        {widget}
    </div>
}