import React from "react";
import styles from "../../css/viewComposer.module.css";

function GenreCard(props) {

    function viewWorksByGenre() {
        props.viewWorksByGenre(props.genre)
    }

    const textDarkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }

    return (
        <span style={textDarkMode} onClick={viewWorksByGenre} className={styles.genreCard}>{props.genre}</span>
    )
}

export default GenreCard;