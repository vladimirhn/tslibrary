import TableDescription from "./TableDescription";
import Fetcher from "../../tools/Fetcher";
import Domain from "../../../application/domain/Domain";

export default class DataSchema {

    private static _schema:TableDescription[] | undefined = undefined;
    public static table(path:string):TableDescription|undefined {

        if (DataSchema._schema) {
            for (const table of DataSchema._schema) {
                if (table.endpoint === path) {
                    return table;
                }
            }

            if (path !== '') {
                console.log("TableDescription for path '" + path + "' not found");
            }
            return undefined;

        } else {
            console.log("DataSchema is not retrieved yet")
        }
    }

    public static gotScheme() {
        return !!this._schema;
    }

    public static getSchema(notifyFunc: (value: (((prevState: boolean) => boolean) | boolean)) => void):void {
        if (!DataSchema._schema) {

            Domain.init();

            Fetcher.get("/u/schema/get")
                .then(result => {

                    DataSchema._schema = [];
                    for (const entry of result) {
                        DataSchema._schema.push(new TableDescription(entry));
                    }

                    DataSchema.applySchema();
                    notifyFunc(true);
                });
        }
    }

    private static applySchema():void {
        console.log(DataSchema._schema)
    }
}