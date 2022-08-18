import React, {FunctionComponent} from 'react';
import DataSet from "../../../data/dataSet/DataSet";
import {TableHeaderCell} from "../abstractTable/TableHeaderCell";
import {TableHeaderRow} from "../abstractTable/TableHeaderRow";

interface properties {
    dataSet:DataSet<any> | undefined
}

export const DataSetTableHead: FunctionComponent<properties> = ({ dataSet }) => {

    if (!dataSet || dataSet.size === 0) return null;

    const headerCells:JSX.Element[] = [];
    let i = 0;
    dataSet.objectDescription?.fieldsDescriptions.forEach((fieldDescription) => {

        if (fieldDescription.isVisible) {
            headerCells.push(<TableHeaderCell key={++i} value={fieldDescription.label} />)

        } else {
            if (fieldDescription.foreignModel) {
                headerCells.push(<TableHeaderCell key={++i} value={fieldDescription.label} />)
            }
        }
    });

    return <TableHeaderRow cells={headerCells} lastCell={true}/>
}