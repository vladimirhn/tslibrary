import React from "react";
import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";

abstract class StateElement<T> {

    protected state:[T, React.Dispatch<React.SetStateAction<T>>];

    protected constructor(state: [T, React.Dispatch<React.SetStateAction<T>>]) {
        this.state = state;
    }

    public abstract getValue(field:ObjectFieldDescription):any;
    public abstract setValue(field:ObjectFieldDescription, value:any):void;
    public abstract getObject():any;
}

export default StateElement;