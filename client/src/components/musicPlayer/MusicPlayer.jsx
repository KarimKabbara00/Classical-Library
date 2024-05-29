import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackward, faForward, faVolumeXmark, faVolumeLow, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import "../../css/musicPlayer.css"
import VolumeBox from "./VolumeBox";

function MusicPlayer(props) {

    /* ---------------------- Volume Box Control ---------------------- */
    const [musicBoxHovered, setMusicBoxHovered] = useState(false);
    function toggleVolumeBox() {
        let timeout = !musicBoxHovered ? 0 : 500; // if not hovered, show instantly
        setTimeout(() => {
            testFunc()
            setTimeout(() => {
                setMusicBoxHovered(prev => !prev);
            }, timeout)
        }, 0)
    }

    // test
    const [test, setTest] = useState(false);
    function testFunc() {
        setTest(prev => !prev);
    }

    // receive from child volumeBox
    const [volume, setVolume] = useState(50);
    function changeVolume(newVolume) {
        setVolume(newVolume);
        changeVolumeIcon(newVolume)
    }

    const [volumeIcon, setVolumeIcon] = useState(faVolumeLow); // faVolumeXmark faVolumeLow
    function changeVolumeIcon(newVolume) {
        if (newVolume === 0)
            setVolumeIcon(faVolumeXmark);
        else if (newVolume > 0 & newVolume < 50)
            setVolumeIcon(faVolumeLow);
        else
            setVolumeIcon(faVolumeHigh);
    }
    /* ---------------------- Volume Box Control ---------------------- */

    /* ---------------------- FontAwesome Icon Control ---------------------- */
    const defaultStyle = { fontSize: '1.25rem', color: "black" };
    const hoveredStyle = { fontSize: '1.25rem', color: "brown" };

    const [rewindHovered, setRewindHovered] = useState(false);
    const [rewindStyle, setRewindStyle] = useState(defaultStyle)
    function changeRewindColor() {
        setRewindHovered(prev => !prev);
        !rewindHovered ? setRewindStyle(hoveredStyle) : setRewindStyle(defaultStyle);
    }

    const [forwardHovered, setForwardHovered] = useState(false);
    const [forwardStyle, setForwardStyle] = useState(defaultStyle);
    function changeForwardColor() {
        setForwardHovered(prev => !prev);
        !forwardHovered ? setForwardStyle(hoveredStyle) : setForwardStyle(defaultStyle);
    }

    const [ppHovered, sePpHovered] = useState(false);
    const [ppStyle, setPpStyle] = useState(defaultStyle);
    function changePpColor() {
        sePpHovered(prev => !prev);
        !ppHovered ? setPpStyle(hoveredStyle) : setPpStyle(defaultStyle);
    }

    const [ppPressed, setPpPressed] = useState(false);
    const [ppIcon, setPpIcon] = useState(faPause);
    function changePpIcon() {
        setPpPressed(prev => !prev);
        !ppPressed ? setPpIcon(faPlay) : setPpIcon(faPause);
        playOrPauseMusic()
    }
    /* ---------------------- FontAwesome Icon Control ---------------------- */

    const [audioPlaying, setAudioPlaying] = useState(true);
    function playOrPauseMusic() {
        setAudioPlaying(prev => !prev)
        !audioPlaying ? props.audioObject.play() : props.audioObject.pause()
    }

    return (
        <div onMouseEnter={toggleVolumeBox} onMouseLeave={toggleVolumeBox}>
            <div className="musicPlayer">
                <div className="musicPlayerBox">
                    <div className="composerPortrait">
                        <img src="https://hips.hearstapps.com/hmg-prod/images/beethoven-600x600.jpg?crop=1xw:1.0xh;center,top&resize=640:*" width="95px" />
                    </div>
                    <div className="songInfo">
                        <div className="songHeader">
                            <div className="songTitle">NAME OF THE SONG</div>
                            <div className="songArtist">Ludwig Van Beethoven</div>
                        </div>
                        <div className="songPlayer">
                            <div className="songDuration">
                                <div className="songTime">13:08</div>
                                <div className="progressBar"></div>
                                <div className="songTime">13:08</div>
                            </div>
                            <div className="controls">
                                <FontAwesomeIcon onMouseEnter={changeRewindColor} onMouseLeave={changeRewindColor} icon={faBackward} style={rewindStyle} />
                                <FontAwesomeIcon onMouseEnter={changePpColor} onMouseLeave={changePpColor} onClick={changePpIcon} icon={ppIcon} style={ppStyle} />
                                <FontAwesomeIcon onMouseEnter={changeForwardColor} onMouseLeave={changeForwardColor} icon={faForward} style={forwardStyle} />
                            </div>
                        </div>
                    </div>
                </div>
                {(musicBoxHovered) && <VolumeBox test={test} testFunc={testFunc} volume={volume} volumeIcon={volumeIcon} changeVolume={changeVolume} />}
            </div>

        </div>
    )
}

export default MusicPlayer;