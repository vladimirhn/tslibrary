import React, {FunctionComponent} from "react";

interface properties {
    flipLogic:any
}

export const ManagementPanelPageFlipper: FunctionComponent<properties> = ({ flipLogic }) => {

    return <>
        <button style={{width: "30px"}} onClick={flipLogic.prevPage} disabled={flipLogic.isFirst}>⇦</button>
        <button style={{width: "30px"}} onClick={flipLogic.nextPage} disabled={flipLogic.isLast}>⇨</button>
        <span> </span>
    </>

}