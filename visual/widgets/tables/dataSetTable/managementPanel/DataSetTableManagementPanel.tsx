import React, {FunctionComponent, useState} from 'react';
import {ManagementPanelDeleteButton} from "./ManagementPanelDeleteButton";
import {ManagementPanelPageFlipper} from "./ManagementPanelPageFlipper";
import {ManagementPanelFiltersWidget} from "./ManagementPanelFiltersWidget";
import {TrueFalseButton} from "../../../buttons/TrueFalseButton";
import {DataState} from "../../../../../data/dataSet/DataState";
import {ManagementPanelInlineFiltersWidget} from "./ManagementPanelInlineFiltersWidget";
import DataSet from "../../../../../data/dataSet/DataSet";
import TableConfig from "../TableConfig";
import Repository from "../../../../../data/backend/Repository";
import BooleanState from "../../../../../data/dataObject/vanila/BooleanState";
import {Button} from "../../../buttons/Button";
import NavigationState from "../../../../../navigation/NavigationState";
import {DataSetTableSubPage} from "../DataSetTableSubPage";

interface properties {
    navigation:NavigationState<DataSetTableSubPage>;
    repository:Repository<any>;
    config:TableConfig;
    flipLogic:any;
}

export const DataSetTableManagementPanel: FunctionComponent<properties> = ({ navigation, repository,
                                                                               config, flipLogic }) => {

    const dataSet:DataSet<any> = repository.dataSet;

    const hasLineProcessorState:BooleanState = new BooleanState(useState<boolean>(!!config.processLineWidget));
    const addOrEditLineButton = hasLineProcessorState.getValue() || config.onAddEditButton ?
        <Button
            enabled={true}
            label={dataSet.hasSelection ? "Редактировать" : "Добавить"}
            onClick={() => {

                if (config.onAddEditButton) {
                    config.onAddEditButton()
                } else {
                    navigation.proceed(DataSetTableSubPage.PROCESS);
                }
            }}
        />
        :null

    const filterVisibilityState:BooleanState = new BooleanState(useState<boolean>(false));
    const dataSetHasData = dataSet && dataSet.size !== 0
    const dataSetHasFilters = dataSet.objectDescription && dataSet.objectDescription.filterFieldsDescriptions.length > 0;
    const filterButton = dataSetHasData && dataSetHasFilters && repository.dataState !== DataState.FILTERED && !config.isInlineFilters ?
        <TrueFalseButton
            variableState={filterVisibilityState}
            trueLabel={"Скрыть фильтры"}
            falseLabel={"Показать фильтры"}
        />
        : null;

    const dropFiltersButton = (repository.dataState === DataState.FILTERED && !config.isInlineFilters) ?
        <button onClick={() => {repository.fetchAll()}}
        >Сбросить фильтры</button>
        : null;

    return <>

        <ManagementPanelPageFlipper flipLogic={flipLogic}/>
        {addOrEditLineButton}
        {config.allowDelete ? <ManagementPanelDeleteButton repository={repository}/> : null}


        {config.allowFilters ? filterButton : null}
        {config.allowFilters ? dropFiltersButton : null}

        {filterVisibilityState.getValue() ? <ManagementPanelFiltersWidget repository={repository} filterVisibilityState={filterVisibilityState}/> : null}
        {config.isInlineFilters ? <ManagementPanelInlineFiltersWidget repository={repository} />: null}
    </>
}