import React from "react";
import styles from "../../css/viewComposer.module.css";

function GenreCard(props) {

    function viewWorksByGenre() {
        props.viewWorksByGenre(props.genre)
    }

    return (
        <span onClick={viewWorksByGenre} className={styles.genreCard}>{props.genre}</span>
    )
}

export default GenreCard;