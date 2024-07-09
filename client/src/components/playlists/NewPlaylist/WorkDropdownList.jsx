import React from "react";
import DropDownListItem from "./DropdownListItem"

function WorkDropdownList(props) {

    function addWork(workID, title, complete_name) {
        props.addWork(workID, title, complete_name);
    }

    return (
        <div>
            {props.shownWorks.map((work, index) => {
                return <DropDownListItem shownWorks={props.shownWorks} worksToAdd={props.worksToAdd} work={work} addWork={addWork} key={index} />
            })}
        </div>
    )
}

export default WorkDropdownList;