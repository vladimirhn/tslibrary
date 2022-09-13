import React, {FunctionComponent} from "react";
import Runnable from "../../../functions/interfaces/Runnable";

interface properties {
    enabled:boolean;
    label:string;
    onClick?:Runnable;
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