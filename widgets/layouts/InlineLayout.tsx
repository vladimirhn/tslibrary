import './layouts.css'

import React, {FunctionComponent} from "react";
import {InlineLayoutItem} from "./InlineLayoutItem";

interface properties {
    widgets: (JSX.Element | null)[];
    defaultWidth?:number;
    firstWidgetWidth?:number;
    lastWidgetWidth?:number;
}

export const InlineLayout: FunctionComponent<properties> = ({widgets, defaultWidth, firstWidgetWidth, lastWidgetWidth}) => {

    const indexedWidgets = widgets
        .filter(entry => entry !== null)
        .map((value, index) => {

            let width = undefined;

            if (index === 0 && firstWidgetWidth) {
                width = firstWidgetWidth;
            } else if ((index === widgets.length - 1) && lastWidgetWidth) {
                width = lastWidgetWidth;
            } else if (defaultWidth) {
                width = defaultWidth;
            }

            return <InlineLayoutItem widget={value} key={index} width={width}/>;
        })

    return <div className={"flex-container"}>{indexedWidgets}</div>
}