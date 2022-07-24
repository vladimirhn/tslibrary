import React, {FunctionComponent} from "react";

interface properties {
    widget: JSX.Element | null
}

export const InlineLayoutItem: FunctionComponent<properties> = ({widget}) => {

    return <>{widget}</>
}