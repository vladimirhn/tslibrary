import React from "react";
import Repository from "./Repository";
import DataObject from "../dataObject/DataObject";

export default class RepositoryState<T> {

    private readonly _state:[Repository<T>, React.Dispatch<React.SetStateAction<Repository<T>>>];

    constructor(state: [Repository<T>, React.Dispatch<React.SetStateAction<Repository<T>>>]) {
        this._state = state;
    }

    public get repository():Repository<T> {
        return this._state[0];
    }

    public initialFetchFiltered(example:DataObject<any>):void {
        this._state[0].initialFetchFiltered(example, this._state[1]);
    }

    public initialFetchAll():void {
        this._state[0].initialFetchAll(this._state[1]);
    }
}