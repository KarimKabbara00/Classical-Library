import React, { useEffect, useState } from "react";
import axios from "axios";
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

        // start spinning
        setSvgIcon(faSpinner);

        // send url
        const response = await axios.post("http://localhost:3001/api/music", {
            url: props.url
        }, {
            responseType: 'blob'
        });

        console.log("received");

        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = window.URL.createObjectURL(blob);
        const audioObject = new Audio(audioUrl);
        props.setCurrentSong({ title: props.title, composer: props.composer, portrait: props.portrait });
        props.showOrHideMusicPlayer(true);
        props.setAudioObject(audioObject);
        audioObject.play();
        setSvgIcon(faCircleStop);
        // else {
        //     console.error("Error fetching audio");
        //     setSvgIcon(faCircleStop);
        // }
    };

    useEffect(() => {
        if (props.currentSong.title !== props.title) {
            setSvgIcon(faCirclePlay);
        }
    }, [props.currentSong, props.title]);

    const playIcon = {
        color: "#a52a2a",
        fontSize: "2rem"
    }

    return (
        <div onClick={handleFetchAudio} className={styles.playButton}>
            <FontAwesomeIcon icon={svgIcon} className={svgIcon === faSpinner ? "fa-spin" : ""} style={playIcon} />
        </div>
    )
}

export default PlayMusic;