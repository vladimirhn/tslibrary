import StateElement from "../StateElement";
import React from "react";
import ObjectFieldDescription from "../objectFieldsDescriptions/ObjectFieldDescription";
import {getFromObject, setToObject} from "./VanilaObjects";

export default class VanillaStateElement<T> extends StateElement<T> {

    constructor(state: [T, React.Dispatch<React.SetStateAction<T>>]) {
        super(state);
    }

    public getValue(field: ObjectFieldDescription): any {
        return getFromObject(this.state[0], field);
    }

    public setValue(field: ObjectFieldDescription, value: any): void {
        setToObject(this.state[0], field, value);
        this.runSetter();
    }

    private runSetter() {
        this.state[1](structuredClone(this.state[0]));
    }

    public getObject() {
        return this.state[0];
    }
}