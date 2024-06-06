import React from "react";
import "../../css/viewComposer.css";

function GenreCard(props) {

    function viewWorksByGenre() {
        props.viewWorksByGenre(props.genre)
    }

    return (
        <span onClick={viewWorksByGenre} className="genreCard">{props.genre}</span>
    )
}

export default GenreCard;