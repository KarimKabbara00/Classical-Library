import React from "react";
import DropDownListItem from "./DropdownListItem"

function WorkDropdownList(props) {

    function addWork(workID) {
        if (props.worksToAdd.includes(workID.toString())) {
            return;
        }
        else {
            props.selectWork(workID)
        }
    }

    return (
        <div>
            {props.shownWorks.map((work, index) => {
                return <DropDownListItem work={work} key={index} worksToAdd={props.worksToAdd} addWork={addWork} />
            })}
        </div>
    )
}

export default WorkDropdownList;