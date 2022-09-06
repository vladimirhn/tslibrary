import React, {FunctionComponent} from 'react';
import {TableHeaderCell} from "./TableHeaderCell";

interface properties {
    cells:JSX.Element[];
    lastCell?:boolean;
}

export const TableHeaderRow: FunctionComponent<properties> = ({ cells , lastCell}) => {

    const last:JSX.Element | null = lastCell ? <TableHeaderCell key={-1}/> : null;

    return <thead>
    <tr>
        {cells}
        {last}
    </tr>
    </thead>
}