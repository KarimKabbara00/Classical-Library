import React from "react";
import "../../css/viewComposer.css";

function ComposerDescription(props) {
    return (
        <span className="composerDescription">{props.description}</span>
    )
}

export default ComposerDescription;