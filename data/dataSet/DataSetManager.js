import {DataState} from "./DataState";

export default class DataSetManager {

    static dataSets = new Map();

    static get(Class) {
        const dataSets = DataSetManager.dataSets;

        if (!dataSets.has(Class)) {
            dataSets.set(Class, new Class());
        }
        return dataSets.get(Class);
    }

    static getNew(Class) {
        const dataSets = DataSetManager.dataSets;

        dataSets.set(Class, new Class());
        dataSets.get(Class).refresh();
        return dataSets.get(Class);
    }

    static getUnfetched(Class) {
        const dataSets = DataSetManager.dataSets;

        if (!dataSets.has(Class)) {
            dataSets.set(Class, new Class());
        }

        const dataSet = dataSets.get(Class);
        dataSet.dataState = DataState.UNFETCHED;
        return dataSet;
    }
}