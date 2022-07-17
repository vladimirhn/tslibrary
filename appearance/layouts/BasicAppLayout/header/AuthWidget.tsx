import React, {FunctionComponent} from 'react';
import './authWidget.css';
import LoginBackend from "../login/LoginBackend";
import Context from "../../../../reflection/Context";


export const AuthWidget: FunctionComponent = () => {

    let logout = () => {
        LoginBackend.logout();
    }

    const userName:string = Context.appStateData.user ? Context.appStateData.user : "anonymous";

    return <div className="auth-widget">
        <button onClick={logout}>Выйти ({userName})</button>
    </div>
}