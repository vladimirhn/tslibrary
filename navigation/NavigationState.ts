import React from "react";

export default class NavigationState<T> {

    private readonly _state:[Array<T>, React.Dispatch<React.SetStateAction<Array<T>>>];

    constructor(state: [Array<T>, React.Dispatch<React.SetStateAction<Array<T>>>]) {
        this._state = state;
    }

    public get currentPage():T | null {
        if (this._state[0].length === 0) {
            return null;
        } else {
            const last: number = this._state[0].length - 1;
            return this._state[0][last]
        }
    }

    public home = ():void => {
        this._state[1]([]);
    }

    public isHome = ():boolean => {
        return this._state[0].length === 0;
    }

    public clean = ():void => {
        this._state[0] = [];
    }

    public proceed = (destination:T):void => {
        this._state[1](this._proceed(this._state[0], destination));
    }

    private _proceed(arr:Array<any>, destination:any):(arr: any) => any[] {
        return arr => [...arr, destination];
    }

    public retreat = ():void => {
        this._state[1](this._retreat(this._state[0]));
    }

    private _retreat(arr:Array<any>):any[] {
        return arr.filter((_, index) => index !== arr.length - 1);
    }
}