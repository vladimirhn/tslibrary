// import Direction from "../data/ordering/Direction";

export default class SortFunction {

    // static byFields = (orders) => {
    //
    //     let props = [];
    //
    //     for (let order of orders) {
    //         let isDesc = order.direction === Direction.DESC;
    //         let property = (isDesc ? "-" : "") + order.field;
    //         props.push(property);
    //     }
    //
    //     return (obj1, obj2) => {
    //         let i = 0, result = 0, numberOfProperties = props.length;
    //
    //         while (result === 0 && i < numberOfProperties) {
    //             result = SortFunction.dynamicSort(props[i])(obj1, obj2);
    //             i++;
    //         }
    //         return result;
    //     }
    // }

    static dynamicSort = (property) => {

        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a, b) => {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
}
