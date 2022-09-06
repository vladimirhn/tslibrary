import React from "react";

import './popup.css'

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className="close-icon" onClick={props.handleClose}>x</div><br/>
                {props.content}
            </div>
        </div>
    );
};

export default Popup;