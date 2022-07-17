
export default class TableData {

    static extractById = (dataArray, id, idName) => {

        if (Array.isArray(dataArray)) {

            if (idName) {
                return dataArray.filter((item) => {
                    return item[idName] === id;
                })[0];

            } else {
                return dataArray.filter((item) => {
                    return item.id === id;
                })[0];
            }
        } else return null;
    }

    static isIdField = (fieldName) => {
        return fieldName === "id" || fieldName.endsWith("Id") || fieldName.endsWith("Ids");
    }
}