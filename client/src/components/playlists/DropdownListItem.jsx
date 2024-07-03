import React, { useState } from "react";
import styles from "../../css/playlists.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function WorkDropdownList(props) {


    const [hovered, setHovered] = useState(false);
    const enabledStyle = {
        cursor: hovered ? "default" : "pointer",
        backgroundColor: hovered ? "brown" : "white",
        color: hovered ? "white" : "black",
    }

    const disabledColor = `rgba(165, 42, 42, 0.7)`
    const disabledStyle = {
        cursor: hovered ? "not-allowed" : "default",
        backgroundColor: hovered ? disabledColor : "white",
        color: hovered ? "white" : "black"
    }

    const termTooShortStyle = {
        cursor: "default",
        backgroundColor: "white",
        color: "black"
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={props.work.workID === -1 ? termTooShortStyle : props.worksToAdd.includes(props.work.workID.toString()) ? disabledStyle : enabledStyle}
            onClick={() => props.addWork(props.work.workID)}
            className={styles.dropdownListItem}
        >
            <div className={styles.workTitleAndIcon}>
                {props.work.workTitle}
                {props.worksToAdd.includes(props.work.workID.toString()) && <FontAwesomeIcon color={hovered ? "white" : "green"} icon={faCheck} />}
            </div>
        </div>
    )
}

export default WorkDropdownList;