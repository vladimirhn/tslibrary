import Fetcher from "../../tools/Fetcher";
import ObjectDescription from "./ObjectDescription";
import Consumer from "../../functions/interfaces/Consumer";
import {FetchingState} from "./FetchingState";
import DataSet from "../dataSet/DataSet";
import DomainClass from "../../reflection/DomainClass";
import Runnable from "../../functions/interfaces/Runnable";
import {DataState} from "../dataSet/DataState";
import DataObject from "../dataObject/DataObject";
import Domain from "../../../application/domain/Domain";
import Class from "../../reflection/Class";
import Data from "../dataObject/Data";
import NavigationState from "../../navigation/NavigationState";

export default class Repository<T> {

    static empty(klass: Class<any> | undefined):Repository<any> {
        return new Repository<any>(Domain.get(klass));
    }

    public readonly domainClass:DomainClass<T> | undefined;
    private readonly _path:string;
    private readonly _objectDescription?:ObjectDescription<T>;
    public dataSet:DataSet<T> = DataSet.empty();
    public _rerender:Runnable = () => {
        if (this._repoSetter) {
            this._repoSetter(this.duplicate());
        }
    };
    private _initialExample?:DataObject<T>;
    public _repoSetter?:Consumer<any>;

    private readonly _defaultOrderBy:string | undefined;

    private _state:FetchingState = FetchingState.NOT_INITIATED;
    private _dataState:DataState = DataState.UNFETCHED;

    constructor(domainClass:DomainClass<T> | undefined) {

        this.domainClass = domainClass;
        this._path = domainClass?.path || "";
        this._objectDescription = domainClass?.objectDescription();

        this._defaultOrderBy = this._objectDescription?.orderByField;
    }

    get objectDescription(): ObjectDescription<T> | undefined {
        return this._objectDescription;
    }

    get state():FetchingState {
        return this._state;
    }

    get dataState():DataState {
        return this._dataState;
    }

    initialFetchAll = (repoSetter:Consumer<any>) => {
        this._repoSetter = repoSetter;
        this.fetchAll();
    }

    duplicate():Repository<any> {
        let duplicate:Repository<any> = new Repository(this.domainClass);
        Object.assign(duplicate, this);

        return duplicate;
    }

    fetchAll = () => {

        let path = this._path + "/get_all";
        if (this._defaultOrderBy) path += "/" + this._defaultOrderBy[0] + "/" + this._defaultOrderBy[1];

        this._state = FetchingState.FETCHING_DATA;

        Fetcher.get(path)
            .then((result:any) => {
                this._state = FetchingState.DATA_FETCHED;
                this._dataState = DataState.FETCHED_ALL;
                this.dataSet.setUpDataSet(this._objectDescription, this._path, result, this._rerender);
                this._rerender();
            });
    }

    initialFetchFiltered = (example:DataObject<T>, repoSetter:Consumer<any>) => {
        this._initialExample = example;
        this._repoSetter = repoSetter;
        this.fetchFiltered(example);
    }

    simplyFetchFiltered = (example:DataObject<T>, setFetched:Consumer<any>) => {
        Fetcher.postForJson(example.data?.getObject(), this._path + "/get_filtered")
            .then(setFetched);
    }

    fetchFiltered = (example:DataObject<T>) => {

        if (example.data?.isDataFieldsEmpty()) {
            this.fetchAll();
            return;
        }

        this._state = FetchingState.FETCHING_DATA;

        Fetcher.postForJson(example.data?.getObject(), this._path + "/get_filtered")
            .then(result => {

                this._state = FetchingState.DATA_FETCHED;
                this._dataState = DataState.FILTERED;
                this.dataSet.setUpDataSet(this._objectDescription, this._path, result, this._rerender);
                this._rerender();
            });
    }

    insert(example:DataObject<T>) {
        if (example.data) {
            this.insertData(example.data);
        } else {
            console.log("Trying to insert DataObject but it's data field is empty.")
        }
    }

    insertData(example:Data<T>) {
        this.insertObject(example.getObject());
    }

    insertObject(obj:{}) {
        Fetcher.postForText(obj, this._path + "/insert")
            .then(result => {

                alert("Сохранено");

                if (this._initialExample) {
                    this.fetchFiltered(this._initialExample)
                } else {
                    this.fetchAll();
                }
            });
    }

    insertAll(data:any, callback:Consumer<any>) {

        Fetcher.postForText(data, this._path + "/insert_all")
            .then(result => {

                alert("Сохранено");

                if (callback) {
                    callback(result);
                }
            });
    }

    delete = (id:string) => {
        Fetcher.getText(this._path + "/delete/" + id)
            .then(result => {

                alert("Удалено");
                this.fetchAll();
            });
    }

    deleteSelected = () => {
        const selectedId = this.dataSet.oneSelectedEntry?.data?.id;
        if (selectedId) {
            this.delete(selectedId);
        } else {
            console.log("Попытка удалить запись, но запись либо не выбрана, либо не содержить поля id.")
        }
    }

    update(example:DataObject<T>) {
        if (example.data) {
            this.updateData(example.data);
        } else {
            console.log("Trying to update DataObject but it's data field is empty.")
        }
    }

    updateData(example:Data<T>) {
        console.log("Обновляется: " + JSON.stringify(example));
        this.updateObject(example.getObject());
    }

    updateObject(obj:{}) {
        Fetcher.postForText(obj, this._path + "/update")
            .then(result => {

                alert("Обновлено");

                if (this._initialExample) {
                    this.fetchFiltered(this._initialExample)
                } else {
                    this.fetchAll();
                }
            });
    }
}