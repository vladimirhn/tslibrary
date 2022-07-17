import React, {FunctionComponent} from 'react';
import DataSet from "../../../data/dataSet/DataSet";

interface properties {
    dataSet:DataSet<any> | undefined
}

export const DataSetTableHead: FunctionComponent<properties> = ({ dataSet }) => {

    if (!dataSet || dataSet.size === 0) return null;

    const headers = [];
    let i = 0;
    dataSet.objectDescription?.fieldsDescriptions.forEach((fieldDescription) => {

        if (fieldDescription.isVisible) {
            headers.push(<th key={++i}>{fieldDescription.label}</th>)

        } else {
            if (fieldDescription.foreignModel) {
                headers.push(<th key={++i}>{fieldDescription.label}</th>)
            }
        }
    });

    headers.push(<td key="1000"/>);

    return <thead>
    <tr>
        {headers}
    </tr>
    </thead>
}