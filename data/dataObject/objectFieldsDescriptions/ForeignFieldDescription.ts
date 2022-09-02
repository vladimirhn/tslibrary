import ObjectFieldDescription from "./ObjectFieldDescription";
import DataType from "../DataType";
import Class from "../../../reflection/Class";

export default class ForeignFieldDescription {

    static withForeignModel(model:Class<any>) {

        return ObjectFieldDescription
            .label(model.name)
            .withType(DataType.FOREIGN_OBJECT)
            .setVisible(true)
            .withForeignModel(model);
    }
}