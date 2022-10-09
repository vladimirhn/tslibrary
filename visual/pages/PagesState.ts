import React from "react";
import Pages from "./Pages";

export default class PagesState {

    private readonly state:[Pages, React.Dispatch<React.SetStateAction<Pages>>];

    public constructor(state: [Pages, React.Dispatch<React.SetStateAction<Pages>>]) {
        this.state = state;
    }

    public getValue(): Pages {
        return this.state[0];
    }

    public setValue(value: Pages): void {
        this.state[1](value);
    }

    public hidePage(jsx:JSX.Element) {
        if (this.state[0].hidePage(jsx)) {
            this.runSetter();
        }
    }

    public showPage(jsx:JSX.Element) {
        if (this.state[0].showPage(jsx)) {
            this.runSetter();
        }
    }

    private runSetter(): void {
        this.state[1](this.state[0].clone());
    }
}