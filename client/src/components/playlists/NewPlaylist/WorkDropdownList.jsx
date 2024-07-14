import React from "react";
import DropDownListItem from "./DropdownListItem"

function WorkDropdownList(props) {

    function addWork(workID, title, complete_name) {
        props.addWork(workID, title, complete_name);
    }

    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
    }

    return (
        <div style={darkMode}>
            {props.shownWorks.map((work, index) => {
                return <DropDownListItem shownWorks={props.shownWorks} worksToAdd={props.worksToAdd} work={work} addWork={addWork} key={index} darkModeEnabled={props.darkModeEnabled} />
            })}
        </div>
    )
}

export default WorkDropdownList;