import FieldDescription from "./FieldDescription";

export default class TableDescription {

    readonly endpoint:string;
    readonly fields:Map<string, FieldDescription> = new Map<string, FieldDescription>();

    constructor(obj:any) {

        this.endpoint = obj.endpoint;

        for (const field in obj.desc) {
            const description:FieldDescription = new FieldDescription();

            Object.assign(description, obj.desc[field]);
            this.fields.set(field, description);
        }

    }
}