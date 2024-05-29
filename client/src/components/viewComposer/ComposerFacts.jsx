import React from "react";
import "../../css/viewComposer.css";

function ComposerFacts(props) {
    return (
        <span className="composerFacts">
            <b>Born: </b>{props.born} |&nbsp;
            <b>Died: </b>{props.died} |&nbsp;
            <b>Epoch: </b>{props.epoch}
        </span>
    )
}

export default ComposerFacts;