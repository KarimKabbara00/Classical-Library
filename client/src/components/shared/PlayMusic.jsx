import React, { useEffect, useState } from "react";
import styles from "../../css/viewWorks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faSpinner, faCircleStop } from "@fortawesome/free-solid-svg-icons";

function PlayMusic(props) {

    const [svgIcon, setSvgIcon] = useState(faCirclePlay);

    function playSong(byURL, urlOrID) {
        props.fetchAudio(byURL, urlOrID);
    }

    return (
        // byUrl is a boolean
        <div onClick={() => playSong(props.byUrl, props.urlOrID)} className={styles.playButton}>
            <FontAwesomeIcon icon={svgIcon} className={svgIcon === faSpinner ? "fa-spin" : ""} style={{ color: "#a52a2a", fontSize: "2rem" }} />
        </div>
    )
}

export default PlayMusic;