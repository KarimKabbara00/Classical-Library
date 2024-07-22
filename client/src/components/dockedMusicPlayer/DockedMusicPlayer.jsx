import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import DockedVolumeBox from "./DockedVolumeBox";
import DockedProgressBar from "./DockedProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackward, faForward, faVolumeXmark, faVolumeLow, faVolumeHigh, faX, faList, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/musicPlayerDocked.module.css";
import handleFetchAudio from "../shared/handleFetchAudio";
import { useMediaQuery } from "@uidotdev/usehooks";
import DockedUpNext from "./DockedUpNext";

function MusicPlayer(props) {

    const [showMusicPlayer, setShowMusicPlayer] = useState(false);
    // playing song
    useEffect(() => {
        if (props.musicRequest && props.playerDocked) {       // when a request comes in

            if (props.audioObject !== null) {                 //  if song is playing, stop
                props.audioObject.pause();
                props.audioObject.currentTime = 0;
                props.setAudioObject(null);
            }

            let byURL = props.musicRequest[0];      // true from homepage/viewWorks | false from allWorks/playlist
            let workQueue = props.musicRequest[1];  // object from playlist otherwise array of identifiers (url or id) 
            props.setQueueLength(workQueue.length);

            let identfier; // id or url

            if (typeof workQueue[props.playlistQueueIndex] === typeof {}) // this is true from playlist only
                identfier = workQueue[props.playlistQueueIndex].id;
            else
                identfier = workQueue[props.playlistQueueIndex];

            handleFetchAudio(byURL, identfier).then(res => {    // res = [Audio object, song metadata] 
                props.setAudioObject(res[0]);
                props.setCurrentSong(res[1]);
                // res[0].addEventListener('canplay', () => {
                //     res[0].play();
                // }, { once: true })
                res[0].play();
                setPpIcon(faPause);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [props.musicRequest, props.playlistQueueIndex]);

    function closeMusicPlayer() {
        try {   // catches exception if executed while music is fetched
            props.audioObject.pause();
            props.audioObject.currentTime = 0;
        }
        catch (e) { console.log(e) }
        props.setAudioObject(null);
        props.setCurrentSong({ title: "", composerName: "", portrait: "" });
        props.setPlaylistQueueIndex(0);
        setShowMusicPlayer(false);
    }

    // show or hide music player if we make another request
    useEffect(() => {
        if (props.anotherRequest && props.currentSong.title !== "") {
            setShowMusicPlayer(true);
        }
        else if (!props.anotherRequest && props.currentSong.title !== "") {
            props.setCurrentSong({ title: "", composerName: "", portrait: "" });
            closeMusicPlayer();
        }
    }, [props.anotherRequest, props.currentSong])

    /* ---------------------- Volume Box Control ---------------------- */
    // Trigger animation to show or hide vol box
    const [volBoxShown, setVolBoxShown] = useState(false);
    function toggleVolBoxShown(show) {
        setVolBoxShown(show);
    }

    // receive from child volumeBox
    const [volume, setVolume] = useState(50); // volume in top level to keep state on unrender
    function changeVolume(newVolume) {
        setVolume(newVolume);
        changeVolumeIcon(newVolume);
        props.audioObject.volume = newVolume / 100;
    }

    // set volume on play
    useEffect(() => {
        if (props.audioObject)
            props.audioObject.volume = volume / 100;
    }, [props.audioObject])

    const [volumeIcon, setVolumeIcon] = useState(faVolumeLow);
    function changeVolumeIcon(newVolume) {
        if (newVolume === 0) setVolumeIcon(faVolumeXmark);
        else if ((newVolume > 0) & (newVolume < 50)) setVolumeIcon(faVolumeLow);
        else setVolumeIcon(faVolumeHigh);
    }
    /* ---------------------- Volume Box Control ---------------------- */

    /* ---------------------- FontAwesome Icon Control ---------------------- */
    const defaultStyle = { fontSize: "1.25rem", color: props.darkModeEnabled ? "#e8e6e3" : "black" };
    const hoveredStyle = { fontSize: "1.25rem", color: "brown", cursor: "pointer" };

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
        setUpStyle(defaultStyle);
    }, [props.darkModeEnabled])

    const [ppIcon, setPpIcon] = useState(faPause);
    function togglePlayPause() {
        if (props.audioObject.paused) {
            props.audioObject.play();
            setPpIcon(faPause);
        }
        else if (!props.audioObject.paused) {
            props.audioObject.pause();
            setPpIcon(faPlay);
        }
    }

    const unhoveredX = { fontSize: "0.75rem", cursor: "pointer", color: props.darkModeEnabled ? "#e8e6e3" : "#000000" };
    const hoveredX = { fontSize: "0.75rem", cursor: "pointer", color: "#a52a2a" };
    const [isXHovered, setIsXHovered] = useState(false);
    const [xStyling, setXStyling] = useState(unhoveredX);
    function changeXStyling() {
        setIsXHovered((prev) => !prev);
        !isXHovered ? setXStyling(hoveredX) : setXStyling(unhoveredX);
    }

    const [upHovered, setUpHovered] = useState(false);
    const [upStyle, setUpStyle] = useState(defaultStyle);
    function changeUpColor() {
        setUpHovered((prev) => !prev);
        !upHovered ? setUpStyle(hoveredStyle) : setUpStyle(defaultStyle);
    }
    /* ---------------------- FontAwesome Icon Control ---------------------- */

    /* ---------------------- Time Control ---------------------- */
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(0);
    useEffect(() => {

        if (!props.audioObject)
            return

        var timeHandlerInterval = setInterval(() => {
            // update current time
            let rawCurrentTime = props.audioObject.currentTime;
            let processedCurrentTime = rawCurrentTime < 3600 ? new Date(rawCurrentTime * 1000).toISOString().substring(14, 19) : new Date(rawCurrentTime * 1000).toISOString().substring(11, 16);
            setTimeElapsed(processedCurrentTime);

            // update elapsed time
            let rawElapsedTime = props.audioObject.duration - props.audioObject.currentTime;
            rawElapsedTime = rawElapsedTime ? rawElapsedTime : 0
            let processedElapsedTime = rawElapsedTime < 3600 ? new Date(rawElapsedTime * 1000).toISOString().substring(14, 19) : new Date(rawElapsedTime * 1000).toISOString().substring(11, 16);
            setRemainingTime(processedElapsedTime);

            // update percentage complete (for progress bar)
            let remainingPercentage = 100 - (rawElapsedTime / props.audioObject.duration) * 100;
            setProgressPercentage(remainingPercentage);

            // change icon to play when song finishes
            if (props.audioObject.ended && props.playlistQueueIndex === props.queueLength - 1) {
                setPpIcon(faPlay);
                props.audioObject.pause()
            }
        }, 200);

        return () => clearInterval(timeHandlerInterval); // clear interval when unmounted
    }, [props.audioObject, props.playlistQueueIndex, props.queueLength]);

    function nextSong() {
        if (props.playlistQueueIndex + 1 <= props.queueLength - 1)
            props.setPlaylistQueueIndex(prev => prev + 1);
        else {
            props.audioObject.currentTime = props.audioObject.duration; // will stop playing on its own
        }
    }

    function prevSong() {
        // if not the first song and currently less than 5 sec
        if (props.playlistQueueIndex - 1 >= 0 && props.audioObject.currentTime <= 3) {
            props.setPlaylistQueueIndex(prev => prev - 1);  // go to prev song
        }
        else {
            props.audioObject.currentTime = 0;  // otherwise set restart song
        }
    }

    // called by progress bar click/drag event
    function updateTime(percentage) {
        props.audioObject.currentTime = props.audioObject.duration * (percentage / 100);
    }
    /* ---------------------- Time Control ---------------------- */

    /* ---------------------- Playlist Control ---------------------- */
    // go to next song when timer is up
    useEffect(() => {
        const ready = props.audioObject && props.audioObject.duration && remainingTime;
        if (ready && remainingTime.toString() === "00:00") {
            if (props.playlistQueueIndex !== props.queueLength - 1) {
                props.setPlaylistQueueIndex(prev => prev + 1);
            }
        }
    }, [remainingTime, props.playlistQueueIndex, props.queueLength])

    const [showUpNextBox, setShowUpNextBox] = useState(false);
    function showUpNext(show) {
        setShowUpNextBox(show);
    }
    /* ---------------------- Playlist Control ---------------------- */

    /* ---------------------- Styling ---------------------- */

    const is1280Px = useMediaQuery("only screen and (max-width : 1280px)");

    // Animate title or not
    const [animateTitle, setAnimateTitle] = useState(false);
    useEffect(() => {
        let maxChar = is1280Px ? 25 : 40
        if (props.currentSong.title.length > maxChar) {
            setAnimateTitle(true);
        }
        else {
            setAnimateTitle(false);
        }
    }, [props.currentSong]);

    // slide music player
    const dockedMusicPlayerAnim = useSpring({
        from: { transform: showMusicPlayer && props.playerDocked ? "translateY(200%)" : "translateY(0%)" },
        to: { transform: showMusicPlayer && props.playerDocked ? "translateY(0%)" : "translateY(200%)" },
        config: { tension: 200, friction: 30 },
    });

    const musicPlayerDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
        borderTop: props.darkModeEnabled ? "2px solid #e8e6e3" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }
    /* ---------------------- Styling ---------------------- */
    return (
        <animated.div style={{ ...dockedMusicPlayerAnim, ...musicPlayerDarkMode }} className={styles.dockedPlayerParent} >
            <div className={styles.songMetaData}>
                <img className={styles.portrait} src={props.currentSong.portrait} width="45px" />

                <div className={styles.songTitle} style={{ justifyContent: animateTitle ? "flex-start" : "center" }}>
                    <div className={animateTitle ? styles.songTitleAnim : styles.songTitleNoAnim}>
                        {props.currentSong.title}
                    </div>
                    {animateTitle &&  // only render a second title if the text is long enough
                        <div className={animateTitle ? styles.songTitleAnim : styles.songTitleNoAnim}>
                            {props.currentSong.title}
                        </div>
                    }
                </div>
                <div className={styles.by}>{props.currentSong.composerName}</div>
            </div>

            <div className={styles.timeAndBar}>
                <div className={styles.time}>{timeElapsed}</div>
                <DockedProgressBar progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage} updateTime={updateTime} docked={true} is1280Px={is1280Px} darkModeEnabled={props.darkModeEnabled} />
                <div className={styles.time}>{remainingTime}</div>
            </div>
            <div className={styles.controls}>
                <FontAwesomeIcon onMouseEnter={changeRewindColor} onMouseLeave={changeRewindColor} onClick={prevSong} icon={faBackward} style={rewindStyle} />
                <FontAwesomeIcon onMouseEnter={changePpColor} onMouseLeave={changePpColor} onClick={togglePlayPause} icon={ppIcon} style={ppStyle} className="fa-fw" />
                <FontAwesomeIcon onMouseEnter={changeForwardColor} onMouseLeave={changeForwardColor} onClick={nextSong} icon={faForward} style={forwardStyle} />

                <div className={styles.volumeParent} onMouseLeave={() => toggleVolBoxShown(false)}>
                    <div className={styles.volIcon} onMouseEnter={() => toggleVolBoxShown(true)}><FontAwesomeIcon icon={volumeIcon} className="fa-fw" /></div>
                    {volBoxShown && <div className={styles.hoverArea}></div>}
                    <DockedVolumeBox volBoxShown={volBoxShown} volume={volume} volumeIcon={volumeIcon} changeVolume={changeVolume} darkModeEnabled={props.darkModeEnabled} />
                </div>

                {props.queueLength > 1 && <div className={styles.upNextParent} onMouseLeave={() => showUpNext(false)}>
                    <div className={styles.upNextIcon} onMouseEnter={() => showUpNext(true)}><FontAwesomeIcon icon={faList} style={{ color: showUpNextBox ? "brown" : "" }} /></div>
                    {showUpNextBox && <div className={styles.upNextHoverArea}></div>}
                    <DockedUpNext showUpNextBox={showUpNextBox} upNext={props.musicRequest[1]} playlistQueueIndex={props.playlistQueueIndex} />
                </div>}

                <div onClick={() => props.togglePlayerType(false)} onMouseEnter={changeUpColor} onMouseLeave={changeUpColor}>
                    <FontAwesomeIcon icon={faArrowUp} style={{ ...upStyle, fontSize: "1.15rem" }} />
                </div>
                <div onClick={closeMusicPlayer} onMouseEnter={changeXStyling} onMouseLeave={changeXStyling}>
                    <FontAwesomeIcon icon={faX} style={{ ...xStyling, fontSize: "1rem" }} />
                </div>
            </div>
        </animated.div >
    );
}

export default MusicPlayer;
