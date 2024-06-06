import React, { useEffect, useState } from "react";
import "../../css/viewWorks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faSpinner, faCircleStop } from "@fortawesome/free-solid-svg-icons";

function WorkCard(props) {
  const [svgIcon, setSvgIcon] = useState(faCirclePlay);

  const handleFetchAudio = async (event) => {
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

    setSvgIcon(faSpinner); // TODO: make spinny
    const response = await fetch(`http://localhost:3001/music`);
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
    <div id="workCardsList">
      <div className="workCard" name="workCard">
        <span>{props.title}</span>
        <span>{props.genre}</span>
        <div onClick={handleFetchAudio} className="playButton">
          <FontAwesomeIcon icon={svgIcon} className={svgIcon === faSpinner ? "fa-spin" : ""} style={{ color: "#a52a2a", fontSize: "2rem" }} />
        </div>
      </div>
    </div>
  );
}

export default WorkCard;
