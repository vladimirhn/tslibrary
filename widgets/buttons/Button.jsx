import React from "react";


export default function Button({funct, label, enabled}) {

    return(
        <button
            onClick={funct}
            disabled={!enabled}
        >
            {label}
        </button>
    )
}