import React from "react";
import styles from "../../css/viewWorks.module.css";
import PlayMusic from "../shared/PlayMusic";

function WorkCard(props) {

  // -------------------- Dark Mode -------------------- //
  const textDarkMode = {
    color: props.darkModeEnabled ? "#e8e6e3" : ""
  }
  // -------------------- Dark Mode -------------------- //

  return (
    <div id="workCardsList">
      <div style={textDarkMode} className={styles.workCard} name="workCard">
        <span>{props.title}</span>
        <span>{props.genre}</span>
        <span>{props.duration}</span>
        <PlayMusic
          urlOrID={props.url}
          title={props.workTitle}
          composer={props.completeName}
          fetchAudio={props.fetchAudio}
          byUrl={true}
          audioObject={props.audioObject}
          setAnotherRequest={props.setAnotherRequest}
        />
      </div>
    </div>
  );
}

export default WorkCard;
