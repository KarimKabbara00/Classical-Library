import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerFacts(props) {
    return (
        <span className={styles.composerFacts}>
            <b>Born: </b>{props.born} |&nbsp;
            <b>Died: </b>{props.died} |&nbsp;
            <b>Epoch: </b>{props.epoch}
        </span>
    )
}

export default ComposerFacts;