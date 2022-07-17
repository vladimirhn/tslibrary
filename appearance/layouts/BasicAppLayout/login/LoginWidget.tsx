import '../app/app.css'
import '../../../themes/common/size.css'

import LoginBackend from "./LoginBackend";
import {FunctionComponent, useState} from "react";
import Context from "../../../../reflection/Context";
import LoginResponseProcessor from "./LoginResponseProcessor";
import CookiesData from "./CookiesData";

export const LoginWidget: FunctionComponent = () => {

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const processResponse:LoginResponseProcessor = (cookiesData: CookiesData) => {
        if (login) {
            Context.appStateData.setFetchedResult(login, cookiesData.expiration || 0);
        } else {
            alert("Неверное имя пользователя или пароль.")
        }
    }

    const doLogin = () => {
        LoginBackend.login({login: login, password: password}, processResponse);
    }

    return <div>
        <input className={"width-300px"} placeholder={"логин"}
               value={login}
               onChange={(e) => {
                   setLogin(e.target.value)
               }}/>

        <input className={"width-300px"} placeholder={"пароль"}
               value={password}
               onChange={(e) => {
                   setPassword(e.target.value)
               }}/>

        <button onClick={doLogin}>Войти</button>
    </div>
}