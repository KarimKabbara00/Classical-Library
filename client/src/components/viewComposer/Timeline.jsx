import React from "react";
import TimelineItem from "./TimelineItem";
import "../../css/viewComposer.css";

function Timeline(props) {
    return (
        <div>
            <div className="timeLineHeader">Timeline</div>
            <div className="timeLine">
                <div className="timeLineArt">
                    <div className="dot"></div>
                    <div className="line"></div>
                    <div className="dot"></div>
                    <div className="line"></div>
                    <div className="dot"></div>
                    <div className="line"></div>
                    <div className="dot"></div>
                    <div className="line"></div>
                    <div className="dot"></div>
                </div>
                <div className="timeLineWords">
                    {props.events.map((PIT, index) => {
                        return <TimelineItem key={index} text={PIT}/> //Point in Time
                    })} 
                </div>
            </div>
        </div>
    )
}

export default Timeline;