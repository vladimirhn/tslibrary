import React, {FunctionComponent} from "react";
import Runnable from "../../../functions/interfaces/Runnable";
import BooleanState from "../../../data/dataObject/vanila/BooleanState";

interface properties {
    variableState:BooleanState;
    trueLabel: string;
    falseLabel: string;
    onTrueToFalse?: Runnable;
    onFalseToTrue?: Runnable;
}

export const TrueFalseButton: FunctionComponent<properties> = ({ variableState, trueLabel, falseLabel, onTrueToFalse, onFalseToTrue }) => {

    const clickProcessor = () => {
        variableState.toggleValue();

        if (onTrueToFalse && variableState.getValue()) {
            onTrueToFalse();
        }

        if (onFalseToTrue && !variableState.getValue()) {
            onFalseToTrue();
        }
    }

    return (

        <button onClick={clickProcessor}>
            {variableState.getValue() ? trueLabel : falseLabel}
        </button>
    )
}