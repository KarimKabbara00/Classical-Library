import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerDescription(props) {
    // -------------------- Dark Mode -------------------- //
    const composerDescriptionDarkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <span style={composerDescriptionDarkMode} className={styles.composerDescription}>{props.description}</span>
    )
}

export default ComposerDescription;