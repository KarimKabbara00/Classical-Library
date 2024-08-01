import React, { useEffect, useState } from "react";
import styles from "../../../css/playlists.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function AddedWork(props) {

    const [title, setTitle] = useState("")
    const [completeName, setCompleteName] = useState("")
    useEffect(() => {
        setTitle(props.work.title);
        setCompleteName(props.work.complete_name);
    }, [props.work])

    const [xHovered, setXHovered] = useState(false);
    function removeWork() {
        props.removeWork(props.work);
    }

    const addedWorkDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        borderBottom: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }

    return (
        <div>
            <div style={addedWorkDarkMode} className={styles.addedWork}>
                <span>{title}</span>
                <span style={{textAlign: "end"}}>{completeName}</span>
                <span className={styles.deleteButton} onClick={() => removeWork(props.workID)} onMouseEnter={() => setXHovered(true)} onMouseLeave={() => setXHovered(false)}>
                    <FontAwesomeIcon icon={faX} color={xHovered ? "red" : props.darkModeEnabled ? "#e8e6e3" : "black"} fontSize="15px" />
                </span>
            </div>
        </div >


    )
}

export default AddedWork;