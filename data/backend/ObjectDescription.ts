import ObjectFieldDescription from "../dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Class from "../../reflection/Class";
import DomainClass from "../../reflection/DomainClass";

export default class ObjectDescription<T> {

    orderByField: string | undefined;

    public readonly klass: Class<DomainClass<T>>;

    private _fieldsDescriptions: ObjectFieldDescription[] = [];
    private _defaultFieldsDescriptions: ObjectFieldDescription[] = [];
    private _mainFieldDescription?: ObjectFieldDescription;
    private _mandatoryFieldsDescriptions: ObjectFieldDescription[] = [];
    private _filterFieldsDescriptions: ObjectFieldDescription[] = [];

    constructor(klass: Class<DomainClass<T>>) {
        this.klass = klass;

        this.createAllDescriptions(klass);
        this.findMainFieldDescription(klass);
        this.findMandatoryFieldsDescriptions(klass);
        this.findDefaultFieldsDescriptions(klass);
        this.findFilterFieldsDescriptions(klass);
    }

    private createAllDescriptions(klass: Class<DomainClass<T>>):void {

        const descriptions = [];
        for (let fieldName in klass) {
            if (klass[fieldName] instanceof ObjectFieldDescription) {
                const description:ObjectFieldDescription = klass[fieldName];

                description.field = fieldName;
                descriptions.push(description);
            }
        }
        this.fieldsDescriptions = descriptions;
    }

    private findMainFieldDescription(klass: Class<DomainClass<T>>):void {

        for (let fieldName in klass) {
            if (klass[fieldName] instanceof ObjectFieldDescription) {

                const description:ObjectFieldDescription = klass[fieldName];

                if (description.isMain) {
                    this.mainFieldDescription = description;
                }
            }
        }
    }

    private findMandatoryFieldsDescriptions(klass: Class<DomainClass<T>>):void {

        const mandatoryFields = [];
        for (let fieldName in klass) {

            if (klass[fieldName] instanceof ObjectFieldDescription) {

                const description: ObjectFieldDescription = klass[fieldName];
                if (description.isMandatory) {
                    mandatoryFields.push(description);
                }
            }
        }
        this.mandatoryFieldsDescriptions = mandatoryFields;
    }

    private findDefaultFieldsDescriptions(klass: Class<DomainClass<T>>):void {

        const defaultFields = [];
        for (let fieldName in klass) {
            if (klass[fieldName] instanceof ObjectFieldDescription) {

                const description: ObjectFieldDescription = klass[fieldName];
                if (description.default) {
                    defaultFields.push(description);
                }
            }
        }
        this.defaultFieldsDescriptions = defaultFields;
    }

    private findFilterFieldsDescriptions(klass: Class<DomainClass<T>>):void {

        const filterFields = [];
        for (let fieldName in klass) {
            if (klass[fieldName] instanceof ObjectFieldDescription) {

                const description: ObjectFieldDescription = klass[fieldName];

                if (description.filter) {
                    filterFields.push(description);
                }
            }
        }
        this._filterFieldsDescriptions = filterFields;
    }

    get fieldsDescriptions(): ObjectFieldDescription[] {
        return this._fieldsDescriptions;
    }

    set fieldsDescriptions(value: ObjectFieldDescription[]) {
        this._fieldsDescriptions = value;
    }

    get defaultFieldsDescriptions(): ObjectFieldDescription[] {
        return this._defaultFieldsDescriptions;
    }

    set defaultFieldsDescriptions(value: ObjectFieldDescription[]) {
        this._defaultFieldsDescriptions = value;
    }

    get mainFieldDescription(): ObjectFieldDescription | undefined {
        return this._mainFieldDescription;
    }

    set mainFieldDescription(value: ObjectFieldDescription | undefined) {
        this._mainFieldDescription = value;
    }

    get mandatoryFieldsDescriptions(): ObjectFieldDescription[] {
        return this._mandatoryFieldsDescriptions;
    }

    set mandatoryFieldsDescriptions(value: ObjectFieldDescription[]) {
        this._mandatoryFieldsDescriptions = value;
    }

    get filterFieldsDescriptions(): ObjectFieldDescription[] {
        return this._filterFieldsDescriptions;
    }

    set filterFieldsDescriptions(value: ObjectFieldDescription[]) {
        this._filterFieldsDescriptions = value;
    }
}