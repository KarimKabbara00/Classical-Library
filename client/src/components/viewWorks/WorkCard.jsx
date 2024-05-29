import React from "react";
import "../../css/viewWorks.css"
import playSVG from "../../images/play.svg"

function WorkCard(props) {
    return (
        <div id="workCardsList">
            <div className="workCard" name="workCard">
                <span>{props.title}</span>
                <span>{props.genre}</span>
                <a href="https://youtube.com/results?search_query=<%=request.composer %> <%= i.title %>" target="_blank" rel="noopener noreferrer"><img className="playButton" src={playSVG} width="40px" /></a>
            </div>
        </div>
    )
}

export default WorkCard;