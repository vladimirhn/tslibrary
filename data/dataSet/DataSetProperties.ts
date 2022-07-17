import Repository from "../backend/Repository";
import ObjectDescription from "../backend/ObjectDescription";

export default class DataSetProperties {

    static withDataSource(dataSource: Repository<any>) {
        return new DataSetProperties(dataSource);
    }

    private readonly _dataSource: Repository<any>;
    private _selectable: boolean;
    private _model?: ObjectDescription<any>;

    constructor(dataSource: Repository<any>) {
        this._dataSource = dataSource;
        this._selectable = true;
    }

    withModel = (model: ObjectDescription<any>) => {
        this._model = model;
        return this;
    }

    notSelectable() {
        this._selectable = false;
        return this;
    }

    get dataSource() {
        return this._dataSource;
    }

    get model() {
        return this._model;
    }

    get selectable() {
        return this._selectable;
    }
}