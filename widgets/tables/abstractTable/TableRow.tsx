import React, {FunctionComponent, MouseEventHandler} from 'react';
import {TableCell} from "./TableCell";
import DataObject from "../../../data/dataObject/DataObject";
import Consumer from "../../../functions/interfaces/Consumer";
import emptyFunction from "../../../functions/emptyFunction";

interface properties {
    cells:JSX.Element[];
    lastCell?:boolean;
    entry?:DataObject<any>;
    isSelected?:boolean;
    onClick?:MouseEventHandler<HTMLTableRowElement>;
    onChoice?:Consumer<any>
}

export const TableRow: FunctionComponent<properties> = ({ cells , lastCell, entry,
                                                          isSelected, onClick, onChoice}) => {

    let click;
    if (onChoice) {
        click = () => {onChoice(entry)}

    } else if (onClick) {
        click = onClick;

    } else {
        click = emptyFunction;
    }


    const last:JSX.Element | null = lastCell ? <TableCell key={-1}/> : null;

    return <tr className={isSelected ? "selected" : "unselected"} onClick={click}>
        {cells}
        {last}
    </tr>
}