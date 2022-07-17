import Class from "./Class";
import ObjectDescription from "../data/backend/ObjectDescription";

export default class DomainClass<T> {

    [index: string]:any;

    public readonly path;
    public readonly klass;

    static empty() {
        return new DomainClass(DomainClass, "");
    }

    constructor(klass: Class<DomainClass<T>>, path: string) {

        this.klass = klass;
        this.path = path;
    }

    public objectDescription():ObjectDescription<T> {
        return new ObjectDescription<T>(this.klass);
    }
}