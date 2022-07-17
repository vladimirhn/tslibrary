import './simpleDataInputForm.css'

import React from 'react';


export default class InputDatumLine extends React.Component {

    processInput = (event) => {
        this.props.inputDatum.processInput(event);
    }

    render() {

        const datum = this.props.inputDatum;

        return <div className={"inputLine"}>

            <div className={"question"}>{datum.question}</div>
            <input onChange={this.processInput} value={datum.datum}/>

        </div>

    }
}