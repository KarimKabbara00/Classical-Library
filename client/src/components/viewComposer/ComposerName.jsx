import React from "react";
import "../../css/viewComposer.css";

function ComposerName(props) {
    return (
        <span className="composerName">{props.complete_name}</span>
    )
}

export default ComposerName;