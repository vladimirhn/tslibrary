
export default class EditableField {

    constructor(label, value, type, entry) {
        this._label = label;
        this._value = value;
        this._type = type;
        this._entry = entry;
    }

    updateEntry(newValue) {
        this._entry[this._value] = newValue;
        this._entry.onUpdateMethod();
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get entry() {
        return this._entry;
    }

    set entry(value) {
        this._entry = value;
    }
}