import React from "react";

export default function DropValueOptionWidget({value, dropFunct}) {

    return <div className="wrapper">
        <div className="inline-200-px">выбрано: {value}</div>
        <div className="inline-200-px"><button onClick={dropFunct}>
            сбросить
        </button></div>

    </div>
}