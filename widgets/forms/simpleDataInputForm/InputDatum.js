
export default class InputDatum {

    constructor(datum, question, filed, statefulWidget) {

        this._datum = datum;
        this._question = question;
        this._field = filed;
        this._statefulWidget = statefulWidget;
    }

    processInput(event) {
        this._datum = event.target.value;
        this._statefulWidget.setState({});
    }

    static generateObject(dataArray) {
        let result = {};

        for (let entry of dataArray) {
            result[entry.field] = entry.datum;
        }

        return result;
    }

    get datum() {
        return this._datum;
    }

    get question() {
        return this._question;
    }

    get field() {
        return this._field;
    }
}