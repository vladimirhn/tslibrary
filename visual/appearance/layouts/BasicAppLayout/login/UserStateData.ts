import CookiesData from "./CookiesData";
import BooleanState from "../../../../../data/dataObject/vanila/BooleanState";

export default class UserStateData {

    private _user: string | undefined;
    private _expires: number | undefined;

    private _needLoginState?:BooleanState

    constructor() {
        this.checkCookie();
    }

    public set userState(needLoginState:BooleanState) {
        this._needLoginState = needLoginState;
    }

    public get user(): string {
        this.checkCookie();
        return this._user || "";
    }

    public expires(): number | undefined {
        this.checkCookie();
        return this._expires;
    }

    public needLogin(): boolean {
        this.checkCookie();
        return !(this._user && this._expires);
    }

    public logout(): void {

        this.setTokenPayloadCookie(this._user, 1);
        this._user = undefined;
        this._expires = undefined;

        this._needLoginState?.setValue(true);
    }

    public setFetchedResult(login: string, expiration: number): void {

        this._user = login;
        this._expires = expiration;

        this.setTokenPayloadCookie(login, expiration);

        this._needLoginState?.setValue(false);
    };

    private checkCookie(): void {
        if (this._user === undefined || this._expires === undefined) {
            let cookiesData: CookiesData = this.getCookiesData();
            this._user = cookiesData.login;
            this._expires = cookiesData.expiration;
        }
    }

    //TODO по возможности убрать параметры
    private setTokenPayloadCookie(login: string | undefined, expires: number | undefined): void {

        if (login && expires) {
            try {
                let loginValue = "login=" + login + ";";
                let expirationTime = new Date(Number(expires)).toUTCString();
                let expiresValue = "expires=" + expirationTime + ";";
                let sameSite = "samesite=strict;";

                let loginCookie = loginValue + expiresValue + sameSite;
                document.cookie = loginCookie;

                let expireCookie = "expirationTime=" + expires + ";" + expiresValue + sameSite;
                document.cookie = expireCookie;

            } catch (e) {
                console.log(e);
            }
        }
    }

    //TODO выделить во что-то отдельное
    private getCookiesData(): CookiesData {

        let cookieObject: CookiesData = new CookiesData();
        let cookies = document.cookie.split(/;/);

        for (let i = 0; i < cookies.length; i++) {

            let cookie = cookies[i].split(/=/);
            switch (cookie[0].trim()) {
                case "login":
                    cookieObject.login = cookie[1];
                    break;
                case "expirationTime":
                    cookieObject.expiration = Number(cookie[1]);
                    break;
            }
        }

        return cookieObject;
    }
}


// let delete_cookie = (name, path, domain) => {
//     if( get_cookie( name ) ) {
//         document.cookie = name + "=" +
//             ((path) ? ";path="+path:"")+
//             ((domain)?";domain="+domain:"") +
//             ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
//     }
// }
//
// let get_cookie = (name) => {
//     return document.cookie.split(';').some(c => {
//         return c.trim().startsWith(name + '=');
//     });
// }