
export default class Datum {

    constructor(id, value, subs) {
        this._id = id;
        this._value = value;
        this._subs = subs || [];
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get subs() {
        return this._subs;
    }

    set subs(value) {
        this._subs = value;
    }
}