import StateElement from "./StateElement";
import React from "react";
import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";
import DataObject from "./DataObject";

export default class DataObjectState extends StateElement<DataObject<any>> {

    constructor(state: [DataObject<any>, React.Dispatch<React.SetStateAction<DataObject<any>>>]) {
        super(state);
    }

    public getValue(field: ObjectFieldDescription): any {
        return this.state[0].data?.getValueByField(field);
    }

    public setValue(field: ObjectFieldDescription, value: any): void {
        this.state[0].data?.setValueByField(field, value);
        this.runSetter();
    }

    public setDataObject(dataObject:DataObject<any> | undefined):void {
        this.state[1](dataObject || DataObject.empty);
    }

    public isEmpty():boolean {
        const obj = this.state[0].data?.getObject();
        return Object.keys(obj).length === 0 || !obj;
    }

    public getId():string | undefined {
        return this.state[0].data?.id;
    }

    private runSetter(): void {
        this.state[1](this.state[0].clone());
    }

    public getDataObject():DataObject<any> {
        return this.state[0];
    }

    public getObject(): {} {
        return this.state[0].data?.getObject();
    }

    public eraseObject(): void {
        this.state[1](DataObject.empty);
    }
}