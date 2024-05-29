import React from "react";
import "../../css/viewComposer.css";

function GenreCard(props) {

    function viewWorksByGenre() {
        props.viewWorksByGenre(props.genre)
    }

    return (
        <a onClick={viewWorksByGenre} className="genreCard">{props.genre}</a>
    )
}

export default GenreCard;