import Arrays from "../../../tools/Arrays";

export default class DataSetUpdateEventProcessor {

    constructor() {
        this._listeners = [];
    }

    addDataUpdateListener(meth) {

        if (!this._listeners.includes(meth)) {
            this._listeners.push(meth);
        }
    }

    removeDataUpdateListener(meth) {
        if (this._listeners.includes(meth)) {
            Arrays.remove(this._listeners, meth);
        }
    }

    broadcastDataUpdateEvent() {
        for (let meth of this._listeners) {
            meth();
        }
    }
}