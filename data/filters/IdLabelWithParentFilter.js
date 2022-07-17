import Filter from "./Filter";
import Arrays from "../../tools/Arrays";
import Datum from "./Datum";

export default class IdLabelWithParentFilter extends Filter {

    constructor(dataSource) {
        super(dataSource, Filter.ID_LABEL_WITH_PARENT);

        this._selectedParentId = null;
        this._selectedId = null;
    }

    get fieldValue() {
        return this._selectedId;
    }

    drop = () => {
        this._selectedParentId = null;
        this._selectedId = null;
    }

    get hierarchicalData() {

        let data = [];

        for (let entry of super.data) {

            let parent = Arrays.findById(data, entry.parentId);

            if (parent) {
                parent.subs.push(new Datum(entry.id, entry.label))
            } else {
                parent = new Datum(entry.parentId, entry.parentLabel);
                data.push(parent);
                parent.subs.push(new Datum(entry.id, entry.label))
            }
        }

        return data;
    }

    get subEntries() {
        let allData = this.hierarchicalData;
        let selectedEntry = Arrays.findById(allData, this._selectedParentId);

        if (selectedEntry) {
            return selectedEntry.subs;
        } else {
            return [];
        }
    }


    get selectedParentId() {
        return this._selectedParentId;
    }

    setSelectedParentId = (value) => {
        if (value === " ") {
            this._selectedParentId = null;
            this._selectedId = null;
        } else {
            this._selectedParentId = value;
        }
        super.updateState();
    }

    get selectedId() {
        return this._selectedId;
    }

    setSelectedId = (value) => {

        if (value === " ") {
            this._selectedId = null;
        } else {
            this._selectedId = value;
        }
        super.updateState();
    }
}