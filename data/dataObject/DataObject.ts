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

    public static withField(field:ObjectFieldDescription, value:any): DataObject<any> {
        const result:DataObject<any> = DataObject.empty();
        result.data?.setValueByField(field, value);

        return result;
    }

    public data?:Data<T>;
    private objectDescription?:ObjectDescription<T>;
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
        this.objectDescription = dataSet.objectDescription;
        this._tableDescription = dataSet.tableDescription;
        this.dataSet = dataSet;
        this.data = new Data(obj, this.objectDescription);

        return this;
    }

    public reduceTo(type:Class<T>):DataObject<T> {
        this.objectDescription = Domain.get(type).objectDescription();
        this._tableDescription = DataSchema.table(Domain.get(type).path);

        return this;
    }

    public processClick = () => {
        this.dataSet?.processEntryClicked(this);
    }

    get fieldsDescriptions():ObjectFieldDescription[] | undefined {
        return this.objectDescription?.fieldsDescriptions;
    }

    get tableDescription(): TableDescription | undefined {
        return this._tableDescription;
    }

    get mainFieldData():any {

        let result: string|undefined = "";

        if (this.objectDescription?.mainFieldDescription) {
            const mainFieldDesc = this.objectDescription.mainFieldDescription;

            if (mainFieldDesc.type === DataType.OBJECT) {
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
            console.log(this.objectDescription + "has no mainFieldDescription, but trying to access it")
        }

        return result;
    }

    get mainFieldDescription():ObjectFieldDescription | undefined {
        if (this.objectDescription) {
            return this.objectDescription.mainFieldDescription;
        }
        return undefined;
    }

    get emptyMandatoryFieldsDescriptions() {
        if (this.objectDescription?.mandatoryFieldsDescriptions.length === 0) {
            return null;
        }

        const emptyMandatoryFieldsDescs = [];
        if (this.objectDescription) {
            for (let mandatoryFieldDesc of this.objectDescription.mandatoryFieldsDescriptions) {
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