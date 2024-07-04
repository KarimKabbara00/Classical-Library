import React, { useEffect, useState } from "react";
import styles from "../../css/playlists.module.css";
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

    return (
        <div>
            <div className={styles.addedWork}>
                <span>{title}</span>
                <span>{completeName}</span>
                <span className={styles.deleteButton} onClick={() => removeWork(props.workID)} onMouseEnter={() => setXHovered(true)} onMouseLeave={() => setXHovered(false)}>
                    <FontAwesomeIcon icon={faX} color={xHovered ? "red" : "black"} fontSize="15px" />
                </span>
            </div>
        </div >


    )
}

export default AddedWork;