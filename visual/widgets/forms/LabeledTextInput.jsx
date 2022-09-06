import React from 'react';

export default class LabeledTextInput extends React.Component {

    render() {
        return <>
            <br/>
            <div className="inline-150-px">{this.props.label}</div>
            <div className="inline-150-px">
                <input className="inline-150-px" type="text"
                       value={this.props.value || ""}
                       onChange={this.props.updateValue}
                />
            </div>
        </>
    }
}