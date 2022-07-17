import ObjectFieldDescription from "./ObjectFieldDescription";
import DataType from "../DataType";

export default class ForeignFieldDescription {

    static withForeignModel(model) {

        return ObjectFieldDescription
            .label(model.name)
            .withType(DataType.OBJECT)
            .setVisible(true)
            .withForeignModel(model);
    }
}