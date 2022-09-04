import React from "react";
import ObjectFieldDescription from "../objectFieldsDescriptions/ObjectFieldDescription";
import {getFromObject, setToObject} from "./VanilaObjects";

export default class VanillaStateMap<T extends Map<any, any>> {

    protected state:[T, React.Dispatch<React.SetStateAction<T>>];

    constructor(state: [T, React.Dispatch<React.SetStateAction<T>>]) {
        this.state = state;
        this.map = this.state[0];
    }

    private readonly map;

    public getValue(key:any, field: ObjectFieldDescription): any {

        const arrValue = this.map.get(key);
        return arrValue ? getFromObject(arrValue, field): undefined;
    }

    public setValue(key:any, field: ObjectFieldDescription, value: any): VanillaStateMap<T> {

        let arrValue = {};

        if (this.map.get(key)) {
            arrValue = this.map.get(key);
        }  else {
            this.map.set(key, arrValue);
        }
        setToObject(arrValue, field, value);
        return this;
    }

    public runSetter() {
        this.state[1](structuredClone(this.map));
    }

    public getArray():any[] {
        return Array.from(this.map.values());
    }
}