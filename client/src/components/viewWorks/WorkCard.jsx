import React, { useState } from "react";
import "../../css/viewWorks.css"
// import playSVG from "../../images/play.svg"
// import stopSVG from "../../images/stop.svg"
// import loadingSVG from "../../images/loading.svg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faSpinner, faCircleStop } from '@fortawesome/free-solid-svg-icons';

function WorkCard(props) {

    const [svgIcon, setSvgIcon] = useState(faCirclePlay);

    const handleFetchAudio = async () => {

        if (svgIcon === faCircleStop) {
            props.audioObject.pause();
            props.audioObject.currentTime = 0;
            props.setAudioObject(null);
            props.setShowMusicPlayer(prev => !prev);
            setSvgIcon(faCirclePlay);
            return
        }

        setSvgIcon(faSpinner); // TODO: make spinny
        const response = await fetch(`http://localhost:3001/music`);
        if (response.ok) {    
            const audioBlob = await response.blob()
            const audioUrl = await URL.createObjectURL(audioBlob);
            const audioObject = new Audio(audioUrl);

            props.setShowMusicPlayer(prev => !prev);
            props.setAudioObject(audioObject);
            audioObject.play();
            setSvgIcon(faCircleStop);
        } else {
            console.error('Error fetching audio');
            setSvgIcon(faCircleStop);
        }
    };

    // function setIcon() {
    //     if (svgIcon === playSVG && !props.showMusicPlayer) {
    //         setSvgIcon(stopSVG);
    //     }
    //     else if (svgIcon === playSVG && !props.showMusicPlayer) {

    //     }
    // }


    return (
        <div id="workCardsList">
            <div className="workCard" name="workCard">
                <span>{props.title}</span>
                <span>{props.genre}</span>
                {/* <img id={props.title} onClick={handleFetchAudio} className="playButton" src={svgIcon} width="40px" /> */}
                <div className="playButton"><FontAwesomeIcon onClick={handleFetchAudio} className={svgIcon === faSpinner ? "fa-spin" : ""} icon={svgIcon} style={{color: "#a52a2a", fontSize: "2rem"}} /></div>
            </div>
        </div>
    )
}

export default WorkCard;