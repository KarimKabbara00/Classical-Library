import React, { useState } from "react";
import styles from "../../css/playlists.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function WorkDropdownList(props) {

    const [hovered, setHovered] = useState(false);
    const enabledStyle = {
        cursor: "pointer",
        backgroundColor: hovered ? "brown" : "white",
        color: hovered ? "white" : "black",
    }

    const disabledColor = `rgba(165, 42, 42, 0.7)`
    const disabledStyle = {
        cursor: "not-allowed",
        backgroundColor: hovered ? disabledColor : "white",
        color: hovered ? "white" : "black"
    }

    const termTooShortStyle = {
        cursor: "default",
        backgroundColor: "white",
        color: "black"
    }

    function addWork() {
        // dont add already added work

        props.addWork(props.work.workID, props.work.workTitle, props.work.complete_name)
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={addWork}
            style={props.work.workID === -1 ? termTooShortStyle : props.disabled ? disabledStyle : enabledStyle}
            className={styles.dropdownListItem}>
            <div className={styles.workTitleAndIcon}>
                {props.work.workTitle}
                {props.disabled && props.work.workID !== -1 && <FontAwesomeIcon color={hovered ? "white" : "green"} icon={faCheck} />}
            </div>
        </div>
    )
}

export default WorkDropdownList;