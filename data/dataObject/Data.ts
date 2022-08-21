import ObjectDescription from "../backend/ObjectDescription";
import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";
import React from "react";

export default class Data<T> {

    public update:React.Dispatch<React.SetStateAction<any>> | undefined;
    static pure():Data<any> {
        return  new Data({}, undefined);
    }

    static from(obj:{}):Data<any> {
        return  new Data(obj, undefined);
    }

    private _obj:any;

    constructor(obj: any, objectDescription:ObjectDescription<T> | undefined) {

        this._obj = obj || {};

        if (objectDescription && objectDescription.defaultFieldsDescriptions) {
            for (let desc of objectDescription.defaultFieldsDescriptions) {
                if (!this.getValue(desc.field)) {
                    this.setValue(desc.field, desc.default);
                }
            }
        }
    }

    public getObject = ():any => {
        return this._obj;
    }

    public setObject = (obj:any) => {
        this._obj = obj;
    }

    public getValue = (fieldName:string):string => {
        return this._obj[fieldName];
    }

    public setValue = (fieldName:string, value:string|undefined):void => {
        this._obj[fieldName] = value;
        if (this.update) {
            const duplicate = Data.pure();
            Object.assign(duplicate, this);
            this.update(duplicate);
        }
    }

    public toUndefined = () => {
        if (this.update) {
            this.update(undefined);
        }
    }

    public getValueByField = (field: ObjectFieldDescription|undefined):any|undefined => {

        let result;

        if (field) {
            let fieldName = field.field;
            result = this.getValue(fieldName);
        }
        else {
            console.log("Some ObjectFieldDescription was not found.")
        }

        return result;
    }

    public getDefinedValueByField = (field: ObjectFieldDescription|undefined):string => {
        return this.getValueByField(field) || "";
    }

    public setValueByField = (field:ObjectFieldDescription, value:any|undefined):void => {
        let fieldName = field.field;
        this.setValue(fieldName, value);
    }

    public nullifyDataFields = ():void => {
        for (let field in this._obj) {
            this._obj.setValue(field, undefined);
        }
    }

    public isDataFieldsEmpty = ():boolean => {
        for (let field in this._obj) {
            let value = this._obj[field];
            if (value !== null && value !== undefined && value !== "") return false;
        }
        return true;
    }

    get id():string {
        return this._obj.id;
    }

    set id(id:string) {
        this._obj.id = id;
    }
}