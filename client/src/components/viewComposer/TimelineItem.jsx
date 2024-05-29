import React from "react";

function TimelineItem(props) {

    function processEventText(text) {
        let s = text.split(":")
        return (
            <span>
                <span style={{ fontWeight: "bold" }}>{s[0]}:</span>
                <span>{s[1]}</span>
            </span>
        )
    }

    return processEventText(props.text);
}

export default TimelineItem;