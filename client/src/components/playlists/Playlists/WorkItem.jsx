import React from "react";
import styles from "../../../css/playlists.module.css";

function PlaylistItem(props) {
    return (
        <div className={styles.playlistWork}>
            <span>
                <span style={{ fontWeight: "bold" }}>{props.index}. </span>
                <span>{props.title}</span>
            </span>
            <span>{props.compName}</span>
        </div>
    )
}

export default PlaylistItem;