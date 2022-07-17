import React from 'react';

export default function ListOption({id, value}) {

        return <option value={id}>
            {value}
        </option>
}