import React, { useEffect, useState } from "react";
import styles from "../../css/viewWorks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faSpinner, faCircleStop } from "@fortawesome/free-solid-svg-icons";

function PlayMusic(props) {

    const [svgIcon, setSvgIcon] = useState(faCirclePlay);

    function playSong(byURL, urlOrID) {
        if (svgIcon === faCircleStop) {     // if button is pressed and icon is stop
            props.setAnotherRequest(false); // did not make another request, hide player. 
            setSvgIcon(faCirclePlay)        // icon play
            return;
        }
        // otherwise
        props.fetchAudio(byURL, [urlOrID]);   // fetch song
        props.setAnotherRequest(true);      // made another request, keep player open.
        setSvgIcon(faSpinner);              // icon spin
    }

    useEffect(() => {
        // when the song is fetched, and the current icon is spinning, set it to stop icon
        if (props.audioObject !== null && svgIcon === faSpinner) {
            setSvgIcon(faCircleStop);
        }
        // when the song is stopped, and the current icon is stop, set it to play icon
        else if (props.audioObject === null && svgIcon === faCircleStop) {
            setSvgIcon(faCirclePlay);
        }
    }, [props.audioObject])

    return (
        // byUrl is a boolean
        <div onClick={() => playSong(props.byUrl, props.urlOrID)} className={styles.playButton}>
            <FontAwesomeIcon icon={svgIcon} className={svgIcon === faSpinner ? "fa-spin" : ""} style={{ color: "#a52a2a", fontSize: "2rem" }} />
        </div>
    )
}

export default PlayMusic;