import '../app/app.css'
import '../../../themes/common/size.css'

import LoginBackend from "./LoginBackend";
import React, {FunctionComponent, useState} from "react";
import Context from "../../../../reflection/Context";
import LoginResponseProcessor from "./LoginResponseProcessor";
import CookiesData from "./CookiesData";

export const RegisterWidget: FunctionComponent = () => {

    const [login, updateLogin] = useState<string>("");
    const [password, updatePassword] = useState<string>("");
    const [confirm, updateConfirm] = useState<string>("");

    const enableButton:boolean = login.length > 0 && password.length > 0 && confirm.length > 0 && (password === confirm);

    const setLogin = (e: React.ChangeEvent<HTMLInputElement>):void => {
        updateLogin(e.target.value);
    }

    const setPassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
        updatePassword(e.target.value);
    }

    const setConfirm = (e: React.ChangeEvent<HTMLInputElement>):void => {
        updateConfirm(e.target.value);
    }

    const doRegister = ():void => {
        LoginBackend.register({login: login, password: password}, processResponse)
    }

    const processResponse:LoginResponseProcessor = (cookiesData: CookiesData) => {
        if (login) {
            Context.appStateData.setFetchedResult(login, cookiesData.expiration || 0);
        } else {
            alert("Неверное имя пользователя или пароль.")
        }
    }

    return <div>
        <input type={"text"} placeholder={"логин"} value={login} onChange={setLogin}/>
        <input type={"password"} placeholder={"пароль"} value={password} onChange={setPassword}/>
        <input type={"password"} placeholder={"ещё раз пароль"} value={confirm} onChange={setConfirm}/>
        <button disabled={!enableButton} onClick={doRegister}>Зарегистрироваться</button>
    </div>
}