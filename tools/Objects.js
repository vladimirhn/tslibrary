
export default class Objects {

    static mapToArray = (obj) => {
        let arr = [];
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                arr.push(obj[field]);
            }
        }
        return arr;
    }

    //Deprecated
    static getFromArrayById = (arr, id) => {
        for (let entry of arr) {
            if (entry.id === id) {
                return entry;
            }
        }
    }

    static getObjectKey = (obj, i) => {
        return Object.keys(obj)[i];
    }
}