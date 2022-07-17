
export default class TableConfig {

    private _allowDelete:boolean = true;
    private _allowFilters:boolean = true;
    private _inlineFilters:boolean = false;


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


    get allowDelete(): boolean {
        return this._allowDelete;
    }

    get allowFilters(): boolean {
        return this._allowFilters;
    }

    get isInlineFilters(): boolean {
        return this._inlineFilters;
    }
}