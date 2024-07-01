import React from "react";
import styles from "../../css/viewWorks.module.css";
import PlayMusic from "../shared/PlayMusic";

function WorkCard(props) {

  return (
    <div id="workCardsList">
      <div className={styles.workCard} name="workCard">
        <span>{props.title}</span>
        <span>{props.genre}</span>
        <span>{props.duration}</span>

        <PlayMusic
          audioObject={props.audioObject}
          setAudioObject={props.setAudioObject}
          showOrHideMusicPlayer={props.showOrHideMusicPlayer}
          url={props.url}
          currentSong={props.currentSong}
          setCurrentSong={props.setCurrentSong}
          title={props.title}
          composer={props.composer}
          portrait={props.portrait}
        />
      </div>
    </div>
  );
}

export default WorkCard;
