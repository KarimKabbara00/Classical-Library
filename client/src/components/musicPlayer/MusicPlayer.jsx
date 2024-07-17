import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackward, faForward, faVolumeXmark, faVolumeLow, faVolumeHigh, faX } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/musicPlayer.module.css";
import VolumeBox from "./VolumeBox";
import ProgressBar from "./ProgressBar";
import { animated, useSpring } from "@react-spring/web";
import handleFetchAudio from "./handleFetchAudio";

function MusicPlayer(props) {

  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [audioObject, setAudioObject] = useState(null);
  const [currentSong, setCurrentSong] = useState({
    title: "",
    composerName: "",
    portrait: ""
  });
  useEffect(() => {
    if (props.musicRequest) {                           // when a request comes in

      if (audioObject !== null) {                       // if song is playing, stop
        audioObject.pause();
        audioObject.currentTime = 0;
        setAudioObject(null);
      }

      let byURL = props.musicRequest[0];                // is it by url or work id
      let urlOrID = props.musicRequest[1];              // the url or work id
      handleFetchAudio(byURL, urlOrID).then(res => {
        // res returns Audio Object and song info 
        setAudioObject(res[0]);
        setCurrentSong(res[1]);
        setShowMusicPlayer(true);
        res[0].play();
      }).catch(err => {
        console.log(err);
      })
    }
  }, [props.musicRequest]);

  function closeMusicPlayer() {
    audioObject.pause();
    audioObject.currentTime = 0;
    setAudioObject(null);
    setShowMusicPlayer(false);
  }

  /* ---------------------- Volume Box Control ---------------------- */
  // Trigger animation to show or hide vol box
  const [volBoxShown, setVolBoxShown] = useState(false);
  function toggleVolBoxShown() {
    setVolBoxShown((prev) => !prev);
  }

  // receive from child volumeBox
  const [volume, setVolume] = useState(50); // volume in top level to keep state on unrender
  function changeVolume(newVolume) {
    setVolume(newVolume);
    changeVolumeIcon(newVolume);
    audioObject.volume = newVolume / 100;
  }

  const [volumeIcon, setVolumeIcon] = useState(faVolumeLow);
  function changeVolumeIcon(newVolume) {
    if (newVolume === 0) setVolumeIcon(faVolumeXmark);
    else if ((newVolume > 0) & (newVolume < 50)) setVolumeIcon(faVolumeLow);
    else setVolumeIcon(faVolumeHigh);
  }
  /* ---------------------- Volume Box Control ---------------------- */

  /* ---------------------- FontAwesome Icon Control ---------------------- */
  const defaultStyle = { fontSize: "1.25rem", color: props.darkModeEnabled ? "#e8e6e3" : "black" };
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

  // update icon colors for dark mode
  useEffect(() => {
    setRewindStyle(defaultStyle);
    setForwardStyle(defaultStyle);
    setPpStyle(defaultStyle);
    setXStyling(unhoveredX);
  }, [props.darkModeEnabled])

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
      audioObject.play();
    } else if (playOrPause === "pause") {
      audioObject.pause();
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
    if (currentSong.title.length > 40) {
      setAnimateTitle(true);
      setCurrentCarouselStyling(animatedCarouselStyling);
    } else {
      setAnimateTitle(false);
      setCurrentCarouselStyling(staticCarouselStyling);
    }
  }, [currentSong]);

  const unhoveredX = { fontSize: "0.75rem", cursor: "pointer", color: props.darkModeEnabled ? "#e8e6e3" : "#000000" };
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

    if (!audioObject)
      return

    var timeHandlerInterval = setInterval(() => {
      // update current time
      let rawCurrentTime = audioObject.currentTime;
      let processedCurrentTime = rawCurrentTime < 3600 ? new Date(rawCurrentTime * 1000).toISOString().substring(14, 19) : new Date(rawCurrentTime * 1000).toISOString().substring(11, 16);
      setTimeElapsed(processedCurrentTime);

      // update elapsed time
      let rawElapsedTime = audioObject.duration - audioObject.currentTime;
      let processedElapsedTime = rawElapsedTime < 3600 ? new Date(rawElapsedTime * 1000).toISOString().substring(14, 19) : new Date(rawElapsedTime * 1000).toISOString().substring(11, 16);
      setRemainingTime(processedElapsedTime);

      // update percentage complete (for progress bar)
      let remainingPercentage = 100 - (rawElapsedTime / audioObject.duration) * 100;
      setProgressPercentage(remainingPercentage);

      // change icon to play when song finishes
      if (rawCurrentTime >= audioObject.duration) {
        changePpIcon("play");
      }
    }, 200);

    return () => {
      clearInterval(timeHandlerInterval); // clear interval when unmounted
    };
  }, [audioObject]);

  function fastforward10() {
    if (audioObject.currentTime + 10 >= audioObject.duration) {
      audioObject.currentTime = audioObject.duration;
    } else {
      audioObject.currentTime += 10;
    }
  }

  function rewind10() {
    if (audioObject.currentTime - 10 <= 0) {
      audioObject.currentTime = 0;
    } else {
      audioObject.currentTime -= 10;
    }
  }

  // called by progress bar click/drag event
  function updateTime(percentage) {
    audioObject.currentTime = audioObject.duration * (percentage / 100);
  }
  /* ---------------------- Time Control ---------------------- */

  // slide music player
  const slideAnim = useSpring({
    from: { transform: showMusicPlayer ? "translateX(-200%)" : "translateX(0%)" },
    to: { transform: showMusicPlayer ? "translateX(0%)" : "translateX(-200%)" },
    config: { tension: 200, friction: 30 },
  });

  // -------------------- Dark Mode -------------------- //
  const musicPlayerDarkMode = {
    backgroundColor: props.darkModeEnabled ? "#242728" : "",
    color: props.darkModeEnabled ? "#e8e6e3" : ""
  }
  // -------------------- Dark Mode -------------------- //

  return (
    <animated.div style={slideAnim} className={styles.musicPlayerBody} onMouseEnter={toggleVolBoxShown} onMouseLeave={toggleVolBoxShown}>
      <div className={styles.musicPlayer}>
        <div style={musicPlayerDarkMode} className={styles.musicPlayerBox}>
          <div className={styles.composerPortrait}>
            <img src={currentSong.portrait} alt="composer portrait" width="95px" />
          </div>
          <div className={styles.songInfo}>
            <div className={styles.songHeader}>
              <div className={styles.songTitle} style={{ justifyContent: animateTitle ? "flex-start" : "center" }}>
                <div className={styles.songTitleAnim} style={currentCarouselStyling}>
                  {currentSong.title}
                </div>
                {animateTitle && ( // only render a second title if the text is long enough
                  <div className={styles.songTitleAnim} style={currentCarouselStyling}>
                    {currentSong.title}
                  </div>
                )}
              </div>
              <div className={styles.songArtist}>{currentSong.composerName}</div>
            </div>
            <div className={styles.songPlayer}>
              <div className={styles.songDuration}>
                <div className={styles.songTime}>{timeElapsed}</div>
                <ProgressBar progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage} updateTime={updateTime} />
                <div className={styles.songTime}>{remainingTime}</div>
              </div>
              <div className={styles.controls}>
                <FontAwesomeIcon onMouseEnter={changeRewindColor} onMouseLeave={changeRewindColor} onClick={rewind10} icon={faBackward} style={rewindStyle} />
                <FontAwesomeIcon onMouseEnter={changePpColor} onMouseLeave={changePpColor} onClick={changePpIcon} icon={ppIcon} style={ppStyle} />
                <FontAwesomeIcon onMouseEnter={changeForwardColor} onMouseLeave={changeForwardColor} onClick={fastforward10} icon={faForward} style={forwardStyle} />
              </div>
            </div>
          </div>
          <div className={styles.closeButton} onClick={closeMusicPlayer} onMouseEnter={changeXStyling} onMouseLeave={changeXStyling}>
            <FontAwesomeIcon icon={faX} style={xStyling} />
          </div>
        </div>
        {<VolumeBox volBoxShown={volBoxShown} volume={volume} volumeIcon={volumeIcon} changeVolume={changeVolume} darkModeEnabled={props.darkModeEnabled} />}
      </div>
    </animated.div>
  );
}

export default MusicPlayer;
