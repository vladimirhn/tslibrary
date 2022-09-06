import './simpleDataInputForm.css'

import React from 'react';
import InputDatumLine from "./InputDatumLine";


export default class SimpleDataInputForm extends React.Component {


    render() {

        let i = 0;
        let lines = [];
        for (let inputDatum of this.props.questionnaire) {
            lines.push(
                <InputDatumLine
                    key={i++}
                    inputDatum={inputDatum}
                />
            );
        }

        return <div>

            <div className={"inputsContainer"}>
                {lines}
            </div>

        </div>
    }
}