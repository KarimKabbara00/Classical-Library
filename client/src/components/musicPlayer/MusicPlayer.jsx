import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackward, faForward, faVolumeXmark, faVolumeLow, faVolumeHigh, faX } from "@fortawesome/free-solid-svg-icons";
import "../../css/musicPlayer.css";
import VolumeBox from "./VolumeBox";
import ProgressBar from "./ProgressBar";
import { animated, useSpring } from "@react-spring/web";

function MusicPlayer(props) {
  /* ---------------------- Volume Box Control ---------------------- */
  // Trigger animation to show or hide vol box
  const [volBoxShown, setVolBoxShown] = useState(false);
  function toggleVolBoxShown() {
    setVolBoxShown((prev) => !prev);
  }

  // receive from child volumeBox
  function changeVolume(newVolume) {
    props.setVolume(newVolume);
    changeVolumeIcon(newVolume);
    props.audioObject.volume = newVolume / 100;
  }

  useEffect(() => {
    // on render, set volume to what it was last
    props.audioObject.volume = props.volume / 100;
    changeVolumeIcon(props.volume);
  }, [props.audioObject, props.volume]);

  const [volumeIcon, setVolumeIcon] = useState(faVolumeLow);
  function changeVolumeIcon(newVolume) {
    if (newVolume === 0) setVolumeIcon(faVolumeXmark);
    else if ((newVolume > 0) & (newVolume < 50)) setVolumeIcon(faVolumeLow);
    else setVolumeIcon(faVolumeHigh);
  }
  /* ---------------------- Volume Box Control ---------------------- */

  /* ---------------------- FontAwesome Icon Control ---------------------- */
  const defaultStyle = { fontSize: "1.25rem", color: "black" };
  const hoveredStyle = { fontSize: "1.25rem", color: "brown" };

  const [rewindHovered, setRewindHovered] = useState(false);
  const [rewindStyle, setRewindStyle] = useState(defaultStyle);
  function changeRewindColor() {
    setRewindHovered((prev) => !prev);
    !rewindHovered ? setRewindStyle(hoveredStyle) : setRewindStyle(defaultStyle);
  }

  const [forwardHovered, setForwardHovered] = useState(false);
  const [forwardStyle, setForwardStyle] = useState(defaultStyle);
  function changeForwardColor() {
    setForwardHovered((prev) => !prev);
    !forwardHovered ? setForwardStyle(hoveredStyle) : setForwardStyle(defaultStyle);
  }

  const [ppHovered, sePpHovered] = useState(false);
  const [ppStyle, setPpStyle] = useState(defaultStyle);
  function changePpColor() {
    sePpHovered((prev) => !prev);
    !ppHovered ? setPpStyle(hoveredStyle) : setPpStyle(defaultStyle);
  }

  const [ppPressed, setPpPressed] = useState(true); // music auto plays when the play button is pressed
  const [ppIcon, setPpIcon] = useState(faPause);
  function changePpIcon() {
    setPpPressed(!ppPressed);
    if (ppPressed) {
      // if was playing, pause
      setPpPressed(false);
      setPpIcon(faPlay);
      playOrPauseMusic("pause");
    } else if (!ppPressed) {
      // if was paused, play
      setPpPressed(true);
      setPpIcon(faPause);
      playOrPauseMusic("play");
    }
  }
  /* ---------------------- FontAwesome Icon Control ---------------------- */

  /* ---------------------- Music Box Control ---------------------- */
  function playOrPauseMusic(playOrPause) {  // can be merged instead of a separate function
    if (playOrPause === "play") {           // separated on purpose for clarity.
      props.audioObject.play();
    } else if (playOrPause === "pause") {
      props.audioObject.pause();
    }
  }

  const animatedCarouselStyling = {
    paddingRight: "2rem",
    paddingLeft: "0.1rem",
    animation: "textCarousel 12s linear infinite",
    animationDelay: "1500ms",
  };

  const staticCarouselStyling = {
    paddingRight: "0rem",
    paddingLeft: "0rem",
    animation: "none",
  };

  const [animateTitle, setAnimateTitle] = useState(false);
  const [currentCarouselStyling, setCurrentCarouselStyling] = useState(null);
  useEffect(() => {
    // animate title or not
    if (props.currentSong.title.length > 40) {
      setAnimateTitle(true);
      setCurrentCarouselStyling(animatedCarouselStyling);
    } else {
      setAnimateTitle(false);
      setCurrentCarouselStyling(staticCarouselStyling);
    }
  }, [props.currentSong.title]);

  function closeMusicPlayer() {
    props.audioObject.pause();
    props.audioObject.currentTime = 0;
    props.showOrHideMusicPlayer(false); // false means hide
  }

  const unhoveredX = { fontSize: "0.75rem", cursor: "pointer", color: "#000000" };
  const hoveredX = { fontSize: "0.75rem", cursor: "pointer", color: "#a52a2a" };
  const [isXHovered, setIsXHovered] = useState(false);
  const [xStyling, setXStyling] = useState(unhoveredX);
  function changeXStyling() {
    setIsXHovered((prev) => !prev);
    !isXHovered ? setXStyling(hoveredX) : setXStyling(unhoveredX);
  }
  /* ---------------------- Music Box Control ---------------------- */

  /* ---------------------- Time Control ---------------------- */
  // deal with time
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  useEffect(() => {
    var timeHandlerInterval = setInterval(() => {
      // update current time
      let rawCurrentTime = props.audioObject.currentTime;
      let processedCurrentTime = rawCurrentTime < 3600 ? new Date(rawCurrentTime * 1000).toISOString().substring(14, 19) : new Date(rawCurrentTime * 1000).toISOString().substring(11, 16);
      setTimeElapsed(processedCurrentTime);

      // update elapsed time
      let rawElapsedTime = props.audioObject.duration - props.audioObject.currentTime;
      let processedElapsedTime = rawElapsedTime < 3600 ? new Date(rawElapsedTime * 1000).toISOString().substring(14, 19) : new Date(rawElapsedTime * 1000).toISOString().substring(11, 16);
      setRemainingTime(processedElapsedTime);

      // update percentage complete (for progress bar)
      let remainingPercentage = 100 - (rawElapsedTime / props.audioObject.duration) * 100;
      setProgressPercentage(remainingPercentage);

      // change icon to play when song finishes
      if (rawCurrentTime >= props.audioObject.duration) {
        changePpIcon("play");
      }
    }, 200);

    return () => {
      clearInterval(timeHandlerInterval); // clear interval when unmounted
    };
  }, [props.audioObject]);

  function fastforward10() {
    if (props.audioObject.currentTime + 10 >= props.audioObject.duration) {
      props.audioObject.currentTime = props.audioObject.duration;
    } else {
      props.audioObject.currentTime += 10;
    }
  }

  function rewind10() {
    if (props.audioObject.currentTime - 10 <= 0) {
      props.audioObject.currentTime = 0;
    } else {
      props.audioObject.currentTime -= 10;
    }
  }

  // called by progress bar click/drag event
  function updateTime(percentage) {
    props.audioObject.currentTime = props.audioObject.duration * (percentage / 100);
  }
  /* ---------------------- Time Control ---------------------- */

  const anim = useSpring({
    from: { transform: props.animInOut ? "translateX(-200%)" : "translateX(0%)" },
    to: { transform: props.animInOut ? "translateX(0%)" : "translateX(-200%)" },
    config: { tension: 200, friction: 30 },
  });

  return (
    <animated.div style={anim} className="musicPlayerBody" onMouseEnter={toggleVolBoxShown} onMouseLeave={toggleVolBoxShown}>
      <div className="musicPlayer">
        <div className="musicPlayerBox">
          <div className="composerPortrait">
            <img src={props.currentSong.portrait} alt="composer portrait" width="95px" />
          </div>
          <div className="songInfo">
            <div className="songHeader">
              <div className="songTitle" style={{ justifyContent: animateTitle ? "flex-start" : "center" }}>
                <div className="songTitleAnim" style={currentCarouselStyling}>
                  {props.currentSong.title}
                </div>
                {animateTitle && ( // only render a second title if the text is long enough
                  <div className="songTitleAnim" style={currentCarouselStyling}>
                    {props.currentSong.title}
                  </div>
                )}
              </div>
              <div className="songArtist">{props.currentSong.composer}</div>
            </div>
            <div className="songPlayer">
              <div className="songDuration">
                <div className="songTime">{timeElapsed}</div>
                <ProgressBar progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage} updateTime={updateTime} />
                <div className="songTime">{remainingTime}</div>
              </div>
              <div className="controls">
                <FontAwesomeIcon onMouseEnter={changeRewindColor} onMouseLeave={changeRewindColor} onClick={rewind10} icon={faBackward} style={rewindStyle} />
                <FontAwesomeIcon onMouseEnter={changePpColor} onMouseLeave={changePpColor} onClick={changePpIcon} icon={ppIcon} style={ppStyle} />
                <FontAwesomeIcon onMouseEnter={changeForwardColor} onMouseLeave={changeForwardColor} onClick={fastforward10} icon={faForward} style={forwardStyle} />
              </div>
            </div>
          </div>
          <div onClick={closeMusicPlayer} onMouseEnter={changeXStyling} onMouseLeave={changeXStyling}>
            <FontAwesomeIcon icon={faX} style={xStyling} />
          </div>
        </div>
        {<VolumeBox volBoxShown={volBoxShown} volume={props.volume} volumeIcon={volumeIcon} changeVolume={changeVolume} />}
      </div>
    </animated.div>
  );
}

export default MusicPlayer;
