import React from "react";
import PlayMusic from "../shared/PlayMusic"
import styles from "../../css/allWorks.module.css";

function WorkItem(props) {
    console.log(props.work)
    return (
        <div className={styles.workCard}>
            <span>{props.workTitle}</span>
            <span>{props.completeName}</span>
            <PlayMusic
                audioObject={props.audioObject}
                setAudioObject={props.setAudioObject}
                showOrHideMusicPlayer={props.showOrHideMusicPlayer}
                url={props.url}
                workID={props.workID}
                currentSong={props.currentSong}
                setCurrentSong={props.setCurrentSong}
                title={props.work.workTitle}
                composer={props.complete_name}
                portrait={props.work.portrait}
                darkModeEnabled={props.darkModeEnabled}
            />
        </div>
    )
}

export default WorkItem;