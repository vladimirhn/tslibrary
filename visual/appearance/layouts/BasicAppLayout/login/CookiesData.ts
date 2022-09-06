
export default class CookiesData {
    login?: string;
    expiration?: number;

    constructor(login?: string | undefined, expiration?: number | undefined) {
        this.login = login;
        this.expiration = expiration;
    }
}