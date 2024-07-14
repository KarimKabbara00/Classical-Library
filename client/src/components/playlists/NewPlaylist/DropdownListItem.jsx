import React, { useEffect, useState } from "react";
import styles from "../../../css/playlists.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function WorkDropdownList(props) {

    const [hovered, setHovered] = useState(false);
    const enabledStyle = {
        cursor: "pointer",
        backgroundColor: props.darkModeEnabled ?
            hovered ? "brown" : "#181a1b" :
            hovered ? "brown" : "white",

        color: props.darkModeEnabled ? "#e8e6e3" :
            hovered ? "white" : "black",
    }

    const disabledColor = `rgba(165, 42, 42, 0.7)`
    const disabledStyle = {
        cursor: "not-allowed",
        backgroundColor: props.darkModeEnabled ?
            hovered ? disabledColor : "#181a1b" :
            hovered ? disabledColor : "white",
        color: props.darkModeEnabled ? "#e8e6e3" :
            hovered ? "white" : "black"
    }

    const termTooShortStyle = {
        cursor: "default",
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "white ",
        color: props.darkModeEnabled ? "#e8e6e3" : "black",
    }


    // const inputDarkMode = {
    //     backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
    //     color: props.darkModeEnabled ? "#e8e6e3" : "",
    // }

    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        let alreadyAdded = props.worksToAdd.some(work => work.workID === props.work.workID);
        setDisabled(alreadyAdded);
    }, [props.shownWorks])


    function addWork() {
        // dont add already added work
        if (props.worksToAdd.some(work => work.workID === props.work.workID.toString()))
            return;

        props.addWork(props.work.workID, props.work.workTitle, props.work.complete_name)
    }



    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={addWork}
            style={props.work.workID === -1 ? termTooShortStyle : disabled ? disabledStyle : enabledStyle}
            className={styles.dropdownListItem}>
            <div className={styles.workTitleAndIcon}>
                <span>{props.work.workTitle}</span>
                <span>
                    {props.work.workID !== -1 && <span style={{ marginRight: "0.75rem" }}>by {props.work.complete_name}</span>}
                    {disabled && props.work.workID !== -1 && <FontAwesomeIcon color={hovered ? "white" : "green"} icon={faCheck} />}
                </span>

            </div>
        </div>
    )
}

export default WorkDropdownList;