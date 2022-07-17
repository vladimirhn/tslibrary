import DataType from "../dataObject/DataType";
import Direction from "./Direction";

export default class Order {

    static withField(field) {
        return new Order(field);
    }

    constructor(field) {
        this._field = field;
        this._type = DataType.STRING;
        this._direction = Direction.ASC;
    }

    withType(type) {
        this._type = type;
        return this;
    }

    withDirection(direction) {
        this._direction = direction;
        return this;
    }


    get field() {
        return this._field;
    }

    get type() {
        return this._type;
    }

    get direction() {
        return this._direction;
    }
}