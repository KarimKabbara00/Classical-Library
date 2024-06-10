import React from "react";
import styles from "../../css/searchResult.module.css";

function LetterHeader(props) {
    console.log(props.lastLetter);
    return (
        <span>{props.lastLetter}</span>
    )
}

export default LetterHeader;