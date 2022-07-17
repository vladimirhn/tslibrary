import ObjectFieldDescription from "./ObjectFieldDescription";

export default class IdFieldDescription {

    static create() {

        return ObjectFieldDescription
            .label("id")
            .setVisible(false);
    }
}