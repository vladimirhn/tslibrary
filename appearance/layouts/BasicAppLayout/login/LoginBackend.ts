import Fetcher from "../../../../tools/Fetcher";
import Credentials from "./Credentials";
import LoginResponseProcessor from "./LoginResponseProcessor";
import CookiesData from "./CookiesData";
import Context from "../../../../reflection/Context";


export default class LoginBackend {

    static login = (data:Credentials, callback:LoginResponseProcessor):void => {

        Fetcher.postForJson(data, "/auth", true)
            .then(json => {
                callback(new CookiesData(json.login,json.expiration))
            })

            //Custom error handler
            .catch(err => {
                console.log("Login failed")
                try {
                    err.json().then((errorMessage:string) => {
                        console.log(errorMessage);
                        callback(new CookiesData(undefined, undefined));
                    })
                } catch (e) {
                    console.log(e)
                }
            })
    }

    static register = (data:Credentials, callback:LoginResponseProcessor):void => {

        // Fetcher.postForText(data, "/register")
        //     .then(json => {
        //         data = JSON.parse(json)
        //         callback(data.login, data.expiration)
        //     })

        Fetcher.postForJson(data, "/auth", true)
            .then(json => {
                callback(new CookiesData(json.login,json.expiration))
            })

            //Custom error handler
            .catch(err => {
                console.log("Registration failed")
                try {
                    err.json().then((errorMessage:string) => {
                        console.log(errorMessage);
                        callback(new CookiesData(undefined, undefined))
                    })
                } catch (e) {
                    console.log(e)
                }
            })
    }

    static logout = () => {
        Fetcher.getText("/u/logout");
        Context.appStateData.logout();
    }
}