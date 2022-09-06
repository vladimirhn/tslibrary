import React from 'react';
import './dropdownMenuButton.css';
// import MainMenuEntry from "../menu/MainMenuEntry";

export default class DropdownMenuButton extends React.Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();

        this.state = {
            isDropdownShown : false,

            dropDownMenuDisplay : {display: "none"},

            hiddenButton : {display: "none"},
            shownButton : {display: "inline"}
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    showHideDropDownMenu = () => {
        if (this.state.dropDownMenuDisplay.display === "block") {
            this.setState({dropDownMenuDisplay : {display: "none"}, isDropdownShown : false});
        } else {
            this.setState({dropDownMenuDisplay : {display: "block"}, isDropdownShown : true});
        }
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.state.isDropdownShown) {
                this.setState({dropDownMenuDisplay : {display: "none"}, isDropdownShown : false});
            }
        }
    }

    render() {

        const entries = this.props.menuEntries.map((page, index) => {
            // return <MainMenuEntry
            //     key={index}
            //     page={page}
            //     processMainMenuChoice={()=>{}}
            // />;

            return null;
        });

        return <div className="dropdown" ref={this.wrapperRef}>

            <button id="dropdown" className="dropbtn" onClick={this.showHideDropDownMenu}> Ξ </button>
            <div id="dropdown-content" className="dropdown-content" style={this.state.dropDownMenuDisplay}>

                {entries}


            </div>
        </div>
    }
}