import React, {FunctionComponent} from 'react';

interface properties {
    value?:string;
}

export const TableHeaderCell: FunctionComponent<properties> = ({ value }) => {

    return <th>{value}</th>
}