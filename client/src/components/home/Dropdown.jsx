import React from "react";
import DropdownItem from "./DropdownItem"
import "../../css/homepage.css"

function Dropdown(props) {

    return (
        <div className="dropdownSuggestions">
            {props.options.map((composer) => {
                return <DropdownItem key={composer.id} id={composer.id} name={composer.name} />
            })}
        </div>
    )
}

export default Dropdown;