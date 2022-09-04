import React, {FunctionComponent} from "react";
import Runnable from "../../functions/interfaces/Runnable";

interface properties {
    onClick:Runnable;
    label:string;
    enabled:boolean;
}

export const Button: FunctionComponent<properties> = ({onClick, label, enabled}) => {

    return(
        <button
            onClick={onClick}
            disabled={!enabled}
        >
            {label}
        </button>
    )
}