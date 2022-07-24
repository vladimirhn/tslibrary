import React, {FunctionComponent} from "react";
import {InlineLayoutItem} from "./InlineLayoutItem";

interface properties {
    widgets: (JSX.Element | null)[]
}

export const InlineLayout: FunctionComponent<properties> = ({widgets}) => {

    const indexedWidgets = widgets.filter(entry => entry !== null).map((value, index) => <InlineLayoutItem widget={value} key={index}/>)

    return <div className={"flex-container"}>{indexedWidgets}</div>
}