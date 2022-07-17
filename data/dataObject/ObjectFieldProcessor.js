import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";

export default class ObjectFieldProcessor {

    constructor(model, updateFunct) {
        this._model = model;
        this._updateFunct = updateFunct;
    }

    setValue(field, value) {
        if (!field instanceof ObjectFieldDescription) {
            throw Error("Field must be an instance of ObjectFieldDescription")
        }

        const dataObject = this._model.dataObject;
        const updateFunct = this._updateFunct;

        dataObject[field.field] = value;

        updateFunct();
    }

    setValues(fields, values) {

        const dataObject = this._model.dataObject;
        const updateFunct = this._updateFunct;

        for (let i = 0; i < fields.length; i++) {
            dataObject[fields[i].field] = values[i];
        }

        updateFunct();
    }

    getValue(field) {

        const dataObject = this._model.dataObject;

        if (dataObject) {
            return dataObject[field.field];
        }

        return null;
    }

    getDefinedValue(field) {
        return this.getValue(field) || "";
    }
}