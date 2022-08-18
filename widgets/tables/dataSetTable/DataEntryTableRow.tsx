import React, {FunctionComponent} from 'react';
import DataType from "../../../data/dataObject/DataType";
import Dates from "../../../tools/Dates";
import DataObject from "../../../data/dataObject/DataObject";
import {TableCell} from "../abstractTable/TableCell";
import {TableRow} from "../abstractTable/TableRow";

interface properties {
    entry:DataObject<any>;
}

export const DataEntryTableRow: FunctionComponent<properties> = ({ entry }) => {

    const cells:JSX.Element[] = [];
    let i = 0;

    entry.fieldsDescriptions?.forEach(fieldDescription => {

        if (fieldDescription.isVisible) {

            let value: string = "";
            let style: any = {};

            if (fieldDescription.type === DataType.DATE) {
                value = Dates.isoDateStringToRusDateString(entry.data?.getValueByField(fieldDescription));
                style = {textAlign: "center"};

            }

            else if (fieldDescription.type === DataType.BOOLEAN) {
                value = entry.data?.getValueByField(fieldDescription) ? "☑" : "️"; //☐
                style = {textAlign: "center"};

            }

            else if (fieldDescription.valuesMap) {
                if (entry.data?.getValueByField(fieldDescription)) {
                    const fieldName:string = entry.data.getValueByField(fieldDescription) || "";
                    value = fieldDescription.valuesMap[fieldName];
                }
            }

            else if (fieldDescription.type === DataType.OBJECT) {

                let foreignObject:string | undefined = entry.data?.getValueByField(fieldDescription);

                if (foreignObject && fieldDescription.foreignModel) {
                    // const dataObjectClass = (fieldDescription as unknown as Class<any>).foreignModel;
                    const foreignInstance:DataObject<any> = new fieldDescription.foreignModel(foreignObject);
                    const mainFieldDescription = foreignInstance.mainFieldDescription;
                    value = foreignInstance.data?.getValueByField(mainFieldDescription) || "";
                }
            }

            else {
                value = entry.data?.getValueByField(fieldDescription) || "";
            }

            cells.push(<TableCell style={style} key={++i} value={value}/>)

        } else {
            if (fieldDescription.foreignModel) {
                const foreignInstance:DataObject<any> = new fieldDescription.foreignModel(entry.data?.getValueByField(fieldDescription));
                cells.push(<TableCell key={++i} value={foreignInstance.data?.getValueByField(foreignInstance.mainFieldDescription)}/>)
            }
        }


    });

    return <TableRow cells={cells} lastCell={true} isSelected={entry.isSelected} onClick={entry.processClick}/>
}