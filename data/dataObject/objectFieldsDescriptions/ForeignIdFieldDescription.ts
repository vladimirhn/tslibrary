import ObjectFieldDescription from "./ObjectFieldDescription";
import DataType from "../DataType";
import DataSet from "../../dataSet/DataSet";

export default class ForeignIdFieldDescription {

    static withForeignDataSet(dataSet:DataSet<any>) {

        return ObjectFieldDescription
            .label("foreignId")
            .setVisible(false)
            .withType(DataType.FOREIGN_OBJECT)
            // .withForeignDataSet(dataSet);
    }
}