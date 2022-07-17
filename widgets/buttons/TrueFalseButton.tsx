import React, {FunctionComponent} from "react";
import Consumer from "../../functions/interfaces/Consumer";
import Runnable from "../../functions/interfaces/Runnable";

interface properties {
    variable: boolean;
    toggleFunct: Consumer<any>;
    trueLabel: string;
    falseLabel: string;
    onTrueToFalse?: Runnable;
    onFalseToTrue?: Runnable;
}

export const TrueFalseButton: FunctionComponent<properties> = ({ variable, toggleFunct, trueLabel, falseLabel, onTrueToFalse, onFalseToTrue }) => {

    const clickProcessor = () => {
        toggleFunct(!variable);

        if (onTrueToFalse && variable) {
            onTrueToFalse();
        }

        if (onFalseToTrue && !variable) {
            onFalseToTrue();
        }
    }

    return (

        <button onClick={clickProcessor}>
            {variable ? trueLabel : falseLabel}
        </button>
    )
}