import React from "react";
import styles from "../../css/searchResult.module.css";

function LetterHeader(props) {
    return (
        <span className={styles.letterHeader}>{props.letter}</span>
    )
}

export default LetterHeader;