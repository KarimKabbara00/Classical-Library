import React from "react";
import styles from "../../css/homepage.module.css";
import PlayMusic from "../shared/PlayMusic";

function BirthdayWorkCard(props) {
    return (
        <div style={{ minWidth: "100%" }}>
            <div className={styles.recommendedWorks}>
                <span>{props.work.title}</span>
                <PlayMusic
                    audioObject={props.audioObject}
                    setAudioObject={props.setAudioObject}
                    showOrHideMusicPlayer={props.showOrHideMusicPlayer}
                    url={props.url}
                    currentSong={props.currentSong}
                    setCurrentSong={props.setCurrentSong}
                    title={props.work.title}
                    composer={props.composerName}
                    portrait={props.composerPortrait}
                    darkModeEnabled={props.darkModeEnabled}
                />
            </div>
        </div>
    )
}

export default BirthdayWorkCard;