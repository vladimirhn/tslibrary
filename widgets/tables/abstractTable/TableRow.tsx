import React, {FunctionComponent, MouseEventHandler} from 'react';
import {TableCell} from "./TableCell";

interface properties {
    cells:JSX.Element[];
    lastCell?:boolean;
    isSelected?:boolean;
    onClick?:MouseEventHandler<HTMLTableRowElement>;
}

export const TableRow: FunctionComponent<properties> = ({ cells , lastCell, isSelected, onClick}) => {

    const last:JSX.Element | null = lastCell ? <TableCell key={-1}/> : null;

    return <tr className={isSelected ? "selected" : "unselected"} onClick={onClick}>
        {cells}
        {last}
    </tr>
}