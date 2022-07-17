import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";

export default class DataObjectInitializer {
    static init(Class) {

        console.log(Class)

        //Создать массив описаний полей
        const descriptions = [];
        for (let descriptionVariableName in Class) {
            if (Class[descriptionVariableName] instanceof ObjectFieldDescription) {

                let fieldName = descriptionVariableName;
                //Поскольку классам нельзя присваивать ничего в static name, необходимо делать static Name, а здесь исправлять.
                if (fieldName === "Name") fieldName = "name";

                Class[descriptionVariableName].field = fieldName; //Инициализация поля field у ObjectFieldDescription.
                descriptions.push(Class[descriptionVariableName]);
            }
        }

        Class.fieldsDescriptions = descriptions;

        //Найти "главное" поле всего объекта
        for (let descriptionVariableName in Class) {
            if (Class[descriptionVariableName] instanceof ObjectFieldDescription) {

                if (Class[descriptionVariableName].isMain) {
                    Class.mainFieldDescription = Class[descriptionVariableName];
                }
            }
        }

        //Создать массив имён обязательных полей
        const mandatoryFields = [];
        for (let desc of descriptions) {
            if (desc.isMandatory) {
                mandatoryFields.push(desc);
            }
        }
        Class.mandatoryFieldsDescriptions = mandatoryFields;

        //Создать массив полей со значениями по умолчанию
        const defaultFields = [];
        for (let desc of descriptions) {
            if (desc.default) {
                defaultFields.push(desc);
            }
        }
        Class.defaultFieldsDescriptions = defaultFields;

        //Найти поле для дефолтной сортировки в базе
        for (let desc of descriptions) {
            if (desc.orderBy) {
                Class.orderByField = [desc.field, desc.orderBy];
            }
        }

        //Создать массив полей для фильтрации
        const filterFields = [];
        for (let desc of descriptions) {
            if (desc.filter) {
                filterFields.push(desc);
            }
        }
        Class.filterFieldsDescriptions = filterFields;

        return true;
    }
}