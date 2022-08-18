import React, {FunctionComponent} from 'react';

interface properties {
    value?:string;
    style?:any;
}

export const TableCell: FunctionComponent<properties> = ({ value, style }) => {

    return <td style={style}>{value}</td>
}