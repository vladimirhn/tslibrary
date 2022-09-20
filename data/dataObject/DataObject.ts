import DataType from "./DataType";
import ObjectDescription from "../backend/ObjectDescription";
import Data from "./Data";
import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";
import DataSet from "../dataSet/DataSet";
import TableDescription from "../schema/TableDescription";
import Class from "../../reflection/Class";
import Domain from "../../../application/domain/Domain";
import DataSchema from "../schema/DataSchema";

export default class DataObject<T> {

    public static empty(): DataObject<any> {
        return new DataObject().setUp({}, DataSet.empty());
    }

    public static fromClass(klass:Class<any>): DataObject<any> {
        return DataObject.fromObject({}, klass);
    }

    public static fromObject(obj:{}, klass:Class<any>): DataObject<any> {
        const dataObject:DataObject<any> = new DataObject().setUp(obj, DataSet.empty());
        dataObject._objectDescription = Domain.get(klass).objectDescription();
        return dataObject;
    }

    public static withField(field:ObjectFieldDescription, value:any): DataObject<any> {
        const result:DataObject<any> = DataObject.empty();
        result.data?.setValueByField(field, value);

        return result;
    }

    public data?:Data<T>;
    private _objectDescription?:ObjectDescription<T>;
    private _tableDescription?:TableDescription;
    public dataSet?:DataSet<T>;

    private _isSelected:boolean;
    private _isNew:boolean;

    public readonly innerId:number | undefined;

    constructor(innerId?:number | undefined) {
        this.innerId = innerId;

        this._isSelected = false;
        this._isNew = false;
    }

    public setUp = (obj:any, dataSet:DataSet<T>) => {

        this.dataSet = dataSet;
        this.data = new Data(obj, this._objectDescription);

        if (dataSet.objectDescription) this._objectDescription = dataSet.objectDescription;
        if (dataSet.tableDescription) this._tableDescription = dataSet.tableDescription;

        return this;
    }

    public clone = ():DataObject<any> => {
        const newDataObject:DataObject<any> = new DataObject<T>(undefined).setUp(this.data?.getObject(), this.dataSet || DataSet.empty());
        newDataObject._objectDescription = this._objectDescription;
        newDataObject._tableDescription = this._tableDescription;

        return newDataObject;
    }

    public reduceTo(type:Class<T>):DataObject<T> {
        this._objectDescription = Domain.get(type).objectDescription();
        this._tableDescription = DataSchema.table(Domain.get(type).path);

        return this;
    }

    public processClick = () => {
        this.dataSet?.processEntryClicked(this);
    }

    get fieldsDescriptions():ObjectFieldDescription[] | undefined {
        return this._objectDescription?.fieldsDescriptions;
    }

    get tableDescription(): TableDescription | undefined {
        return this._tableDescription;
    }

    get mainFieldData():any {

        let result: string|undefined = "";

        if (this._objectDescription?.mainFieldDescription) {
            const mainFieldDesc = this._objectDescription.mainFieldDescription;

            if (mainFieldDesc.type === DataType.FOREIGN_OBJECT) {
                let foreignObject = this.data?.getValueByField(mainFieldDesc);

                if (foreignObject && mainFieldDesc.foreignModel) {
                    const foreignModelObj:DataObject<any> = new mainFieldDesc.foreignModel(foreignObject);
                    const mainFieldDescription = foreignModelObj.mainFieldDescription;
                    result = foreignModelObj.data?.getValueByField(mainFieldDescription);
                }
            } else {
                result = this.data?.getValue(mainFieldDesc.field);
            }
        } else {
            console.log(this._objectDescription + "has no mainFieldDescription, but trying to access it")
        }

        return result;
    }

    get mainFieldDescription():ObjectFieldDescription | undefined {
        if (this._objectDescription) {
            return this._objectDescription.mainFieldDescription;
        }
        return undefined;
    }

    get emptyMandatoryFieldsDescriptions() {
        if (this._objectDescription?.mandatoryFieldsDescriptions.length === 0) {
            return null;
        }

        const emptyMandatoryFieldsDescs = [];
        if (this._objectDescription) {
            for (let mandatoryFieldDesc of this._objectDescription.mandatoryFieldsDescriptions) {
                if (!this.data?.getValue(mandatoryFieldDesc.field)) {
                    emptyMandatoryFieldsDescs.push(mandatoryFieldDesc);
                }
            }

            if (emptyMandatoryFieldsDescs.length === 0) {
                return null;
            }
        }

        return emptyMandatoryFieldsDescs;
    }

    //геттеры сеттеры
    get isSelected() {
        return this._isSelected;
    }

    set isSelected(value) {
        this._isSelected = value;
    }

    get isNew() {
        return this._isNew;
    }

    set isNew(value) {
        this._isNew = value;
    }
    //-- конец "геттеры сеттеры"
}