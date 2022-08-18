import React from "react";

export default class PrimitiveState<T> {

    private readonly state:[T, React.Dispatch<React.SetStateAction<T>>];

    public constructor(state: [T, React.Dispatch<React.SetStateAction<T>>]) {
        this.state = state;
    }

    public getValue(): T {
        return this.state[0];
    }

    public setValue(value: T): void {
        this.state[1](value);
    }
}