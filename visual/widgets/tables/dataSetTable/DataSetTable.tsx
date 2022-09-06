import Repository from "../../../../data/backend/Repository";
import TableConfig from "./TableConfig";
import Consumer from "../../../../functions/interfaces/Consumer";
import React, {FunctionComponent, useState} from "react";
import {RepositoryState} from "../../../../data/backend/RepositoryState";
import {DataEntryTableRow} from "./DataEntryTableRow";
import {DataSetTableManagementPanel} from "./managementPanel/DataSetTableManagementPanel";
import {DataSetTableHead} from "./DataSetTableHead";
import {TableWithPanel} from "../abstractTable/TableWithPanel";
import NavigationState from "../../../../navigation/NavigationState";
import {DataSetTableSubPage} from "./DataSetTableSubPage";

interface properties {
    navigation:NavigationState<DataSetTableSubPage>;
    repository:Repository<any>;
    config:TableConfig;
    onChoice?:Consumer<any>;
}

export const DataSetTable: FunctionComponent<properties> = ({ navigation, repository, config , onChoice}) => {

    const linesPerPage = 20;
    const [pageNum, setPageNum] = useState(0);

    let flipLogic = {
        nextPage: () => {setPageNum(pageNum + 1);},
        prevPage : () => {setPageNum(pageNum - 1);},
        isFirst: true,
        isLast: true
    }


    let rows:(JSX.Element | null)[] = [];

    if (repository.state !== RepositoryState.DATA_FETCHED) {

        rows.push(<tr key={-1}>
            <td style={{textAlign: "center"}}>
                Загрузка данных
            </td>
        </tr>)

    }
    else if (repository.dataSet.size === 0) {
        rows.push(<tr  key={-2}>
            <td style={{textAlign: "center"}}>
                Таблица пуста
            </td>
        </tr>)

    }
    else {

        flipLogic.isFirst = pageNum === 0;
        let itemsNum = repository.dataSet.size;
        let lastPage = (itemsNum / linesPerPage) | 0;
        flipLogic.isLast = pageNum === lastPage;

        rows = repository.dataSet.entriesArray.map((entry, index) => {

            if (index >= pageNum * linesPerPage
                &&
                index < (pageNum + 1) * linesPerPage
                &&
                !entry.isNew
            ) {
                return <DataEntryTableRow
                    key={index}
                    entry={entry}
                    onChoice={onChoice}
                />
            } else return null;
        }).filter((e:JSX.Element | null) => e !== null);


    }

    const managementPanel = <DataSetTableManagementPanel
        navigation={navigation}
        repository={repository}
        config={config}
        flipLogic={flipLogic}
    />;

    const header = <DataSetTableHead dataSet={repository.dataSet}/>;

    return <TableWithPanel lastCell={true} topPanel={managementPanel} header={header} rows={rows}/>

}