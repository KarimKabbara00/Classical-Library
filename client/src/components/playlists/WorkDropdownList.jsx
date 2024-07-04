import React, { useEffect, useState } from "react";
import DropDownListItem from "./DropdownListItem"

function WorkDropdownList(props) {

    function addWork(workID, title, complete_name) {
        props.addWork(workID, title, complete_name);
    }

    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        // THIS RETURNS THE COMMON OBJECTS BETWEEN SHOWN WORKS AND WORKS TO ADD (ALLEGEDLY).
        // NEED TO SOMEHOW PASS TO MAP BELOW WHETHER THE COMPONENT IS DISABLED.
        props.shownWorks.filter(item1 => props.worksToAdd.some(item2 => item1.workID === item2.workID)).map(item => item.workID);
    }, [props.shownWorks])

    return (
        <div>
            {props.shownWorks.map((work, index) => {
                return <DropDownListItem worksToAdd={props.worksToAdd} work={work} addWork={addWork} disabled={disabled} key={index} />
            })}
        </div>
    )
}

export default WorkDropdownList;