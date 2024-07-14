import React, { useState } from "react";
import styles from "../../css/viewWorks.module.css";

function GenreButton(props) {

    const [hovered, setHovered] = useState(false);

    const styling = {
        color: props.currentGenre === props.name || hovered ? "white" : "black",
        backgroundColor: props.currentGenre === props.name || hovered ? "brown" : "white",
        borderColor: props.currentGenre === props.name || hovered ? "brown" : "black",
        cursor: "pointer",
    }

    function onAction() {
        setHovered(prev => !prev);
    }

    function onClick() {
        props.onGenreButtonClick(props.name);
    }

    return (
        <div style={styling} className={styles.genreButton} onClick={onClick} onMouseOver={onAction} onMouseOut={onAction}>
            {props.name}
        </div>
    )
}

export default GenreButton;