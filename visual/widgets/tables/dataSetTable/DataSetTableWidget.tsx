import React, {FunctionComponent, useState} from "react";
import TableConfig from "./TableConfig";
import Repository from "../../../../data/backend/Repository";
import {DataSetTable} from "./DataSetTable";
import NavigationState from "../../../../navigation/NavigationState";
import {DataSetTableSubPage} from "./DataSetTableSubPage";
import {Button} from "../../buttons/Button";
import SharedServices from "../../../../SharedServices";

interface properties {
    repository:Repository<any>;
    config:TableConfig;
    sharedServices?:SharedServices;
}

export const DataSetTableWidget: FunctionComponent<properties> = ({ repository, config ,
                                                                      sharedServices}) => {

    const navigation:NavigationState<DataSetTableSubPage> = new NavigationState<any>(useState<Array<any>>([]));
    if (sharedServices) sharedServices.navigation = navigation;

    const tableWidget:JSX.Element =
        <DataSetTable
            navigation={navigation}
            repository={repository}
            config={config}
        />;

    const backButton = <Button enabled={true} label={"Назад"} onClick={navigation.retreat}/>

    switch (navigation.currentPage) {
        case DataSetTableSubPage.PROCESS:
            return <>
                {backButton}
                {config.processLineWidget}
            </>

        default:
            return tableWidget;
    }
}