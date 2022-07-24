import React, {FunctionComponent} from "react";

interface properties {
    label?:string;
    widget: JSX.Element
}

export const InputLayout: FunctionComponent<properties> = ({widget, label}) => {

    return <div>
        <div className="inline-200-px">{label}</div>
        <div className="inline-200-px"> {widget}</div>
    </div>
}