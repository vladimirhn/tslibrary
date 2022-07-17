import Arrays from "../../../tools/Arrays";

export default class FetchingEventProcessor {

    constructor() {
        this._listeners = [];
    }

    addFetchingListener(meth) {
        if (!this._listeners.includes(meth)) {
            this._listeners.push(meth);
        }
    }

    removeFetchingListener(meth) {
        if (this._listeners.includes(meth)) {
            Arrays.remove(this._listeners, meth);
        }
    }

    broadcastStartFetching() {
        for (let meth of this._listeners) {
            meth(true);
        }
    }

    broadcastFinishFetching() {
        for (let meth of this._listeners) {
            meth(false);
        }
    }
}