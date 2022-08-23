import ObjectDescription from "../backend/ObjectDescription";
import DataObject from "../dataObject/DataObject";
import DomainClass from "../../reflection/DomainClass";
import Runnable from "../../functions/interfaces/Runnable";
import TableDescription from "../schema/TableDescription";
import DataSchema from "../schema/DataSchema";

export default class DataSet<T> {

    static empty() {
        return new DataSet(DomainClass.empty(), {data:[]});
    }

    private _objectDescription?:ObjectDescription<T>;
    private _tableDescription?:TableDescription;
    private _entriesArray:DataObject<T>[] = [];

    private _rerender:Runnable = ()=>{};
    private _multiChoice = false;

    constructor(domainClass:DomainClass<T>, data:any) {
        this.setUpDataSet(domainClass.objectDescription(), "", data, ()=>{});
    }

    setUpDataSet = (objectDescription:ObjectDescription<T> | undefined, path:string, data:any, rerender:Runnable) => {
        this._objectDescription = objectDescription;
        this._tableDescription = DataSchema.table(path);
        this._rerender = rerender;

        if (!data) data = {data:[]};
        this._initEntriesArray(data);
    }

    private _initEntriesArray = (response:any) => {

        this._entriesArray = [];

        let i = 0;
        for (let t of response.data) {
            this._entriesArray.push(new DataObject<T>(i++).setUp(t, this));
        }
    }

    public processEntryClicked = (entry:DataObject<T>) => {

        if (this._multiChoice) {
            this.toggleMultiSelection(entry);
        } else {
            this.toggleOneSelection(entry);
        }
    }
    // --- finish initialization

    // Selection
    public toggleOneSelection = (entry:DataObject<T>) => {
        for (let t of this._entriesArray) {
            if (t.innerId === entry.innerId) {
                t.isSelected = !t.isSelected;
            } else {
                t.isSelected = false;
            }
        }
        this._rerender();
    }

    public setSelectedById = (id: string) => {
        for (let entry of this._entriesArray) {
            if (entry.data?.id === id) {
                entry.isSelected = true;
            }
        }
    }

    public dropOneSelection = () => {
        for (let t of this._entriesArray) {
            if (t.isSelected) {
                t.isSelected = false;
                break;
            }
        }
        this._rerender();
    }

    public toggleMultiSelection = (entry:DataObject<T>) => {
        for (let t of this._entriesArray) {
            if (t === entry) {
                t.isSelected = !t.isSelected;
            }
        }
        this._rerender();
    }

    get oneSelectedEntry() {
        for (let t of this._entriesArray) {
            if (t.isSelected) return t;
        }
        return null;
    }

    get allSelectedEntries() {
        let selectedEntries = [];
        for (let t of this._entriesArray) {
            if (t.isSelected) selectedEntries.push(t);
        }
        return selectedEntries;
    }

    get hasSelection() {
        return this.oneSelectedEntry !== null;
    }

    public dropSelection = ():void => {
        for (let t of this._entriesArray) {
            t.isSelected = false;
        }
    }


    get objectDescription(): ObjectDescription<T> | undefined {
        return this._objectDescription;
    }


    get tableDescription(): TableDescription | undefined {
        return this._tableDescription;
    }

    get size() {
        return this._entriesArray.length || 0;
    }

    public getFirst = ():DataObject<T> | undefined => {
        return this._entriesArray.length > 0 ? this._entriesArray[0] : undefined;
    }

    public getById = (id:string):DataObject<T> | undefined => {

        for (let entry of this._entriesArray) {

            if (entry.data?.id === id) {
                return entry;
            }
        }
        return undefined;
    }

    get entriesArray() {
        return this._entriesArray;
    }

    public isEmpty = ():boolean => {
        return this._entriesArray.length === 0;
    }

    public clearData = () => {
        this._entriesArray = [];
    }

    public findMainFieldDataById = (id:string) => {
        let name;

        if (!id) {
            name = null;
        } else {
            const entry = this.getById(id);
            if (entry) {
                name = entry.mainFieldData;
            }
        }

        return name;
    }
}