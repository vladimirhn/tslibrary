export default class Fetcher {


    static mode = window.location.origin.endsWith(":3000") ? 'cors' : 'same-origin'; //no-cors, cors, *same-origin
    static orig = window.location.origin.endsWith(":3000") ? "http://localhost:8080" : window.location.origin;
    static cred = window.location.origin.endsWith(":3000") ? "include" : "same-origin";

    static get = (page) => {

        return fetch(this.orig + page, { // optional fetch options
            //body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: Fetcher.cred, // include, same-origin, *omit
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: Fetcher.mode, // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => {
                if (!response.ok) {

                    Fetcher.processError(response);
                    return null;

                } else {
                    return response.json();
                }
            })
            .then(response => response);
    }

    static getText = (page) => {

        return fetch(this.orig + page, { // optional fetch options
            // body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: Fetcher.cred, // include, same-origin, *omit
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: Fetcher.mode, // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return null;
                }
            })
            .then(response => response);
    }

    static postForJson = (data, page, specialErrorProcessor) => {

        let request = { // optional fetch options
            body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include (cookie interchange), same-origin, *omit
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: Fetcher.mode, // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        };

        return fetch(this.orig + page, request)
            .then(response => {

                if (!response.ok) {

                    if (specialErrorProcessor) {
                        throw response;
                    } else {
                        Fetcher.processError(response);
                        return null;
                    }

                } else {
                    return response.json();
                }
            })
    }

    static postForText = (data, page) => {

        return fetch(this.orig + page, { // optional fetch options
            body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: Fetcher.cred, // include, same-origin, *omit
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: Fetcher.mode, // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return null;
                }
            })
            .then(response => {
                return response;
            });
    }

    static processError = (error) => {
        try {
            error.json().then(error => {
                console.log(error);
            })
        } catch (e) {
            console.log(e);
        }
    }
}