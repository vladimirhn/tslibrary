import React, {FunctionComponent, useState} from 'react';
import {ManagementPanelDeleteButton} from "./ManagementPanelDeleteButton";
import {ManagementPanelPageFlipper} from "./ManagementPanelPageFlipper";
import {ManagementPanelFiltersWidget} from "./ManagementPanelFiltersWidget";
import {TrueFalseButton} from "../../../buttons/TrueFalseButton";
import {DataState} from "../../../../data/dataSet/DataState";
import {ManagementPanelInlineFiltersWidget} from "./ManagementPanelInlineFiltersWidget";
import DataSet from "../../../../data/dataSet/DataSet";
import TableConfig from "../TableConfig";
import Repository from "../../../../data/backend/Repository";

interface properties {
    repository:Repository<any>;
    config:TableConfig;
    flipLogic:any
}

export const DataSetTableManagementPanel: FunctionComponent<properties> = ({ repository, config, flipLogic }) => {

    const dataSet:DataSet<any> = repository.dataSet;

    const [filtersVisible, toggleFiltersVisibility] = useState(false);

    const dataSetHasData = dataSet && dataSet.size !== 0
    const dataSetHasFilters = dataSet.objectDescription && dataSet.objectDescription.filterFieldsDescriptions.length > 0;
    const filterButton = dataSetHasData && dataSetHasFilters && repository.dataState !== DataState.FILTERED && !config.isInlineFilters ?
        <TrueFalseButton
            toggleFunct={toggleFiltersVisibility}
            variable={filtersVisible}
            falseLabel={"Показать фильтры"}
            trueLabel={"Скрыть фильтры"}
        />
        : null;

    const dropFiltersButton = (repository.dataState === DataState.FILTERED && !config.inlineFilters) ?
        <button onClick={() => {repository.fetchAll()}}
        >Сбросить фильтры</button>
        : null;

    return <>

        <ManagementPanelPageFlipper flipLogic={flipLogic}/>
        {config.allowDelete ? <ManagementPanelDeleteButton repository={repository}/> : null}


        {config.allowFilters ? filterButton : null}
        {config.allowFilters ? dropFiltersButton : null}

        {filtersVisible ? <ManagementPanelFiltersWidget repository={repository} toggleVisibilityFunct={toggleFiltersVisibility}/> : null}
        {config.isInlineFilters ? <ManagementPanelInlineFiltersWidget repository={repository} />: null}
    </>
}