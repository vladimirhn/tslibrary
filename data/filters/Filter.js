
export default class Filter {

    static DATE = "DATE";
    static ID_LABEL_WITH_PARENT = "ID_LABEL_WITH_PARENT";

    constructor(dataSource, type) {
        this._dataSource = dataSource;
        this._type = type;
        this._dataSet = null;

        this._applied = false;

        this._data = [];
    }

    set dataSet(value) {
        this._dataSet = value;
    }

    get dataSource() {
        return this._dataSource;
    }

    get type() {
        return this._type;
    }

    get data() {
        return this._data;
    }

    dropData = () => {
        this._data = [];
    }

    setData = (response) => {
        if (response.data) {
            for (let entry of response.data) {
                this._data.push(entry);
            }

            if (this._dataSet) this._dataSet.updateState();
        }
    }

    updateState() {
        this._dataSet.updateState();
    }
}