import ObjectFieldDescription from "./ObjectFieldDescription";
import DataType from "../DataType";

export default class ForeignIdFieldDescription {

    static withForeignDataSet(dataSet) {

        return ObjectFieldDescription
            .label("foreignId")
            .setVisible(false)
            .withType(DataType.FOREIGN)
            .withForeignDataSet(dataSet);
    }
}