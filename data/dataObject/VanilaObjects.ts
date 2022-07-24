import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";

export function setToObject (obj:any, field:ObjectFieldDescription, value:any):any {
    obj[field.field] = value;
    return obj;
}

export function getFromObject(obj:any, field:ObjectFieldDescription):any {
    return obj[field.field];
}