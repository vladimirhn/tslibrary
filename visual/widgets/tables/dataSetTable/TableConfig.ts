import Consumer from "../../../../functions/interfaces/Consumer";
import Runnable from "../../../../functions/interfaces/Runnable";

export default class TableConfig {

    private _allowDelete:boolean = true;
    private _allowFilters:boolean = true;
    private _inlineFilters:boolean = false;

    private _processLineWidget:JSX.Element | null = null;

    private _onSelection?:Consumer<any>;
    private _onAddEditButton?:Runnable;

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

    processLinesWith(widget:JSX.Element) {
        this._processLineWidget = widget;
        return this;
    }

    onSelectionFunc(selectionConsumer:Consumer<any>):TableConfig {
        this._onSelection = selectionConsumer;
        return this;
    }

    onAddEditButtonFunc(funct:Runnable):TableConfig {
        this._onAddEditButton = funct;
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

    get processLineWidget(): JSX.Element | null {
        return this._processLineWidget;
    }

    get onSelection():Consumer<any> | undefined {
        return this._onSelection;
    }

    get onAddEditButton():Runnable | undefined {
        return  this._onAddEditButton;
    }
}