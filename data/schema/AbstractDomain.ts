import Class from "../../reflection/Class";
import DomainClass from "../../reflection/DomainClass";

export default class AbstractDomain {

    readonly classToInstance:Map<Class<any>, DomainClass<any>>;

    constructor(classToInstance:Map<Class<any>, DomainClass<any>>) {
        this.classToInstance = classToInstance;
    }

    public get(klass: Class<any> | undefined): DomainClass<any> {

        const domainInstance:DomainClass<any> | undefined = this.classToInstance.get(klass || DomainClass);
        if (domainInstance) {
            return domainInstance;

        } else {
            throw new Error("Class " + klass?.name + " is not added to domain set.");
        }
    }

    public getAll(): DomainClass<any>[] {

        return Array.from(this.classToInstance.values());

    }

    public getByPath(path:string): DomainClass<any> {
        for (let domainInstance of this.getAll()) {
            if (domainInstance.path === path) {
                return domainInstance;
            }
        }
        throw new Error("Path: '" + path + "' is not added to domain set.");
    }
}