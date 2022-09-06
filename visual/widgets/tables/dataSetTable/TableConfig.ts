import SharedServices from "../../../../SharedServices";

export default class TableConfig {

    private _allowDelete:boolean = true;
    private _allowFilters:boolean = true;
    private _inlineFilters:boolean = false;

    // private _sharedServices:SharedServices | null = null;
    private _processLineWidget:JSX.Element | null = null;


    noDelete(): TableConfig {
        this._allowDelete = false;
        return this;
    }

    noFilers(): TableConfig {
        this._allowFilters = false;
        return this;
    }

    inlineFilters(): TableConfig {
        this._inlineFilters = true;
        return this;
    }

    // withSharedServices(sharedServices:SharedServices) {
    //     this._sharedServices = sharedServices;
    //     return this;
    // }

    processLinesWith(widget:JSX.Element) {
        this._processLineWidget = widget;
        return this;
    }


    get allowDelete(): boolean {
        return this._allowDelete;
    }

    get allowFilters(): boolean {
        return this._allowFilters;
    }

    get isInlineFilters(): boolean {
        return this._inlineFilters;
    }
    //
    // get sharedServices():SharedServices | null {
    //     return this._sharedServices;
    // }

    get processLineWidget(): JSX.Element | null {
        return this._processLineWidget;
    }
}