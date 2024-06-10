import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerDescription(props) {
    return (
        <span className={styles.composerDescription}>{props.description}</span>
    )
}

export default ComposerDescription;