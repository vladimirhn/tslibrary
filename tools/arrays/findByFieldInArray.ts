import ObjectFieldDescription from "../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";

export default function findByFieldInArray(array: Array<any> | undefined, fieldDescription: ObjectFieldDescription, value: any): any | undefined {

    if (array) for (const entry of array) {
        for (const field in entry) {
            if (field === fieldDescription.field && entry[fieldDescription.field] === value) {
                return entry;
            }
        }
    }

    return undefined;
}