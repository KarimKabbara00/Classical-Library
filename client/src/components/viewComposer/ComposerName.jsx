import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerName(props) {
    return (
        <span className={styles.composerName}>{props.complete_name}</span>
    )
}

export default ComposerName;