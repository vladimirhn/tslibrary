import SortFunction from "./SortFunction";
import Dates from "./Dates";
// import DataType from "../data/dataObject/DataType";

export default class Arrays {

    static remove = (arr, obj) => {

        const index = arr.indexOf(obj);
        if (index !== -1) {
            arr.splice(index, 1);
        }

        return index;
    }

    static add = (arr, obj, index) => {
        arr.splice(index, 0, obj);
    }

    static findById = (arr, id) => {
        for (let entry of arr) {
            if (entry.id === id) {
                return entry;
            }
        }
    }

    // static sort = (arr, orders) => {
    //
    //     const alteredDates = [];
    //     const rusDatePattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    //
    //     for (let order of orders) {
    //         for (let entry of arr) {
    //
    //             let isDate = order.type === DataType.DATE;
    //             if (isDate && rusDatePattern.test(entry[order.field])) {
    //                 alteredDates.push(order.field);
    //                 entry[order.field] = Dates.rusDateStringToIsoDateString(entry[order.field]);
    //             }
    //         }
    //     }
    //
    //     arr.sort(SortFunction.byFields(orders));
    //
    //     for (let fieldName of alteredDates) {
    //         for (let entry of arr) {
    //             entry[fieldName] = Dates.isoDateStringToRusDateString(entry[fieldName]);
    //         }
    //     }
    // }
}