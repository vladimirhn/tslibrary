import '../app/app.css'
import '../../../themes/common/size.css'

import React, {FunctionComponent, useState} from 'react';
import {RegisterWidget} from "./RegisterWidget";
import {LoginWidget} from "./LoginWidget";

const login: string = "login";
const register: string = "register";

export const LoginPage: FunctionComponent = () => {

    const [mode, setMode] = useState<string>(login)

    let widget;

    switch (mode) {
        case login: widget = <LoginWidget/>; break;
        case register: widget = <RegisterWidget/>; break;
        default: widget = null;
    }

    return <div className={"screen-center-50vh login-widget"}>
        <div className={"width-300px"}>

            <div className={"width-150px inline-block"} onClick={() => {
                setMode(login)
            }}
            >Войти
            </div>

            <div className={"width-150px inline-block"} onClick={() => {
                setMode(register)
            }}
            >Зарегистрироваться
            </div>

        </div>

        <div className={"width-300px"}>
            {widget}
        </div>

    </div>
}