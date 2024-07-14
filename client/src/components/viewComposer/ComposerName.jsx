import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerName(props) {
    // -------------------- Dark Mode -------------------- //
    const composerNameDarkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <span style={composerNameDarkMode} className={styles.composerName}>{props.complete_name}</span>
    )
}

export default ComposerName;