import React from 'react';
import ListOption from "./ListOption";

export default function Combobox({isFirstEmpty, data, valueName, processChoiceMethod, selectedValue}) {

        const options = [];
        let i = 0;

        if (isFirstEmpty) {
            options.push(
                <ListOption
                    key={i++}
                    id={" "}
                    value={" "}
                />
            )
        }

        if (data) {
            for (let entry of data) {
                options.push(
                    <ListOption
                        key={i++}
                        id={entry.id}
                        value={entry[valueName]}
                    />
                )
            }
        }

        return <select onChange={(e) => processChoiceMethod(e.target.value)} value={selectedValue || ""} style={{minWidth:'200px'}}>
            {options}
        </select>
}