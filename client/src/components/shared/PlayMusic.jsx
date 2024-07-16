import React, { useEffect, useState } from "react";
import styles from "../../css/viewWorks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faSpinner, faCircleStop } from "@fortawesome/free-solid-svg-icons";

function PlayMusic(props) {

    const [svgIcon, setSvgIcon] = useState(faCirclePlay);


    const handleFetchAudio = async () => {
        // if another song is played while something already is playing, reset time.
        if (props.audioObject !== null) {
            props.audioObject.pause();
            props.audioObject.currentTime = 0;
        }

        // change icon, stop music, and return
        if (svgIcon === faCircleStop) {
            props.showOrHideMusicPlayer(false);
            setSvgIcon(faCirclePlay);
            return;
        }

        setSvgIcon(faSpinner);

        var response;
        if (props.url !== undefined) {  // send url
            response = await fetch("http://localhost:3001/api/musicByURL", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: props.url })
            });
        }
        else {
            response = await fetch("http://localhost:3001/api/musicByID", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ workID: props.workID })
            });
        }

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = await URL.createObjectURL(audioBlob);
            const audioObject = new Audio(audioUrl);
            props.setCurrentSong({ title: props.title, composer: props.composer, portrait: props.portrait });
            props.showOrHideMusicPlayer(true);
            props.setAudioObject(audioObject);
            audioObject.play();
            setSvgIcon(faCircleStop);
        } else {
            console.error("Error fetching audio");
            setSvgIcon(faCircleStop);
        }
    };

    useEffect(() => {
        if (props.currentSong.title !== props.title) {
            setSvgIcon(faCirclePlay);
        }
    }, [props.currentSong, props.title]);

    return (
        <div onClick={handleFetchAudio} className={styles.playButton}>
            <FontAwesomeIcon icon={svgIcon} className={svgIcon === faSpinner ? "fa-spin" : ""} style={{ color: "#a52a2a", fontSize: "2rem" }} />
        </div>
    )
}

export default PlayMusic;