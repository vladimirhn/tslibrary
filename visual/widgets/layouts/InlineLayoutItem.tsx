import React, {FunctionComponent} from "react";

interface properties {
    widget: JSX.Element | null;
    width?:number;
}

export const InlineLayoutItem: FunctionComponent<properties> = ({widget, width}) => {

    const widthString = width ? width+"px" : undefined;

    return <div style={{width:widthString}}>{widget}</div>
}