import React, {FunctionComponent, useState} from "react";

import {DataEntryTableRow} from "./DataEntryTableRow";
import {DataSetTableHead} from "./DataSetTableHead";
import TableConfig from "./TableConfig";
import Repository from "../../../data/backend/Repository";
import {RepositoryState} from "../../../data/backend/RepositoryState";
import {DataSetTableManagementPanel} from "./managementPanel/DataSetTableManagementPanel";

interface properties {
    repository:Repository<any>;
    config:TableConfig;
}

export const DataSetTable: FunctionComponent<properties> = ({ repository, config }) => {

    const linesPerPage = 20;
    const [pageNum, setPageNum] = useState(0);

    let flipLogic = {
        nextPage: () => {setPageNum(pageNum + 1);},
        prevPage : () => {setPageNum(pageNum - 1);},
        isFirst: true,
        isLast: true
    }


    let rows;

    if (repository.state !== RepositoryState.DATA_FETCHED) {

        rows = <tr>
            <td style={{textAlign: "center"}}>
                Загрузка данных
            </td>
        </tr>

    }
    else if (repository.dataSet.size === 0) {
        rows = <tr>
            <td style={{textAlign: "center"}}>
                Таблица пуста
            </td>
        </tr>

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
                />
            } else return null;
        });
    }

    return <div>

        <DataSetTableManagementPanel
            repository={repository}
            config={config}
            flipLogic={flipLogic}
        />

        <table className="last-cell-table">
            <DataSetTableHead dataSet={repository.dataSet}/>

            <tbody>
            {rows}
            </tbody>

        </table>
    </div>
}