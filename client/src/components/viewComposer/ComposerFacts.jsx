import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerFacts(props) {
    // -------------------- Dark Mode -------------------- //
    const composerFactsDarkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <span style={composerFactsDarkMode} className={styles.composerFacts}>
            <b>Born: </b>{props.born} |&nbsp;
            <b>Died: </b>{props.died} |&nbsp;
            <b>Epoch: </b>{props.epoch}
        </span>
    )
}

export default ComposerFacts;