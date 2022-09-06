import React from "react";

export default class BooleanState {

    private readonly state:[boolean, React.Dispatch<React.SetStateAction<boolean>>];

    public constructor(state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]) {
        this.state = state;
    }

    public getValue(): boolean {
        return this.state[0];
    }

    public setValue(value: boolean): void {
        this.state[1](value);
    }

    public toggleValue():void {
        this.state[1](!this.state[0]);
    }
}