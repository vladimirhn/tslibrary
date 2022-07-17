import DataType from "../DataType";
import DataObject from "../DataObject";
import Class from "../../../reflection/Class";
import DomainClass from "../../../reflection/DomainClass";

/**
 * Описание поля в объекте с данными. Основываясь на данном описании функции могут правильно отображать данные объекта
 * прежде всего в таблицах, а также вообще везде, в формах, в тексте и т.д.
 */
export default class ObjectFieldDescription {

    static label(label:string) {
        return new ObjectFieldDescription(label);
    }

    field:string = "";       //Имя поля объекта. Инициализируется автоматически в DataObject.
    private readonly _label:string;           //Заголовок столбца таблицы для данного поля
    private _isMain = false;         //Можно ли свести данные всего объекта, к данным этого поля. Поле-заголовок.
    type = DataType.STRING;  //Тип данных поля, если тип стандартный. Если кастомный, то _customType
    private _isVisible = true;         //Должно ли поле отображаться в таблицах
    _array = false;          //Ссылается ли поле на массив
    _customType = null;      //Класс объекта, если поле ссылает на кастомный объект
    _foreignDataSet = null;  //DataSet внешней ссылки
    private _foreignModel?: Class<any>;    //Класс внешней ссылки
    private _isMandatory = false;    //Является ли поле обязательным при создании записи
    private _default?:string;         //Значение по умолчанию
    private _valuesMap = null;       //Список (объект) возможных значений
    _isOrderBy = null;       //Сортировать ли в базе по эттому полю по умолчанию
    private _filter = false;          //Используется ли поле для фильтрации

    constructor(label:string) {
        this._label = label || "";
    }

    public withDefault(aDefault:string):ObjectFieldDescription {
        this._default = aDefault;
        return this;
    }

    public withType(type:string):ObjectFieldDescription {
        this.type = type;
        return this;
    }

    public withValuesMap(map:any):ObjectFieldDescription {
        this._valuesMap = map;
        return this;
    }

    public setVisible(visible:boolean):ObjectFieldDescription {
        this._isVisible = visible;
        return this;
    }

    public setMain(isMain:boolean):ObjectFieldDescription {
        this._isMain = isMain;
        return this;
    }

    public withForeignModel(type:Class<any>):ObjectFieldDescription {
        this._foreignModel = type;
        return this;
    }

    public setFilter(filter:boolean) {
        this._filter = filter;
        return this;
    }

    get label():string {
        return this._label;
    }

    get isMain():boolean {
        return  this._isMain;
    }

    get isVisible():boolean {
        return this._isVisible;
    }

    get foreignModel(): Class<any> | undefined {
        return this._foreignModel;
    }

    get isMandatory(): boolean {
        return this._isMandatory;
    }

    get default(): string | undefined {
        return this._default;
    }

    get valuesMap():any {
        return this._valuesMap;
    }

    get filter():boolean {
        return this._filter;
    }
 }