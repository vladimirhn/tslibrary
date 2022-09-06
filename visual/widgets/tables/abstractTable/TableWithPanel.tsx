import React, {FunctionComponent} from 'react';

interface properties {
    lastCell?:boolean;
    topPanel?:JSX.Element;
    header?:JSX.Element;
    rows?:(JSX.Element | null)[];
}

export const TableWithPanel: FunctionComponent<properties> = ({ lastCell, topPanel, header, rows}) => {

    return <div>

        {topPanel}

        <table className={lastCell ? "last-cell-table" : undefined}>
            {header}

            <tbody>
            {rows}
            </tbody>

        </table>
    </div>
}