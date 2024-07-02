import React, { useState } from "react";
import styles from "../../css/playlists.module.css";
import x from "../../images/x.svg";

function AddWorkToPlaylist(props) {

    const [enteredText, setEnteredText] = useState("");
    function updateEnteredText(event) {
        const val = event.target.value;
        setEnteredText(val)
    }

    return (
        <div className={styles.searchForWorkItem}>
            <input onInput={updateEnteredText} className={styles.searchForWork} value={enteredText} placeholder="Search for work..." />
            <img onClick={() => props.destroyItem(props.index)} src={x} width="20px" />
        </div>

    )
}

export default AddWorkToPlaylist;