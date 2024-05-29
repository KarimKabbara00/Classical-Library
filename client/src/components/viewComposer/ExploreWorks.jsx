import React, { useState } from "react";
import "../../css/viewComposer.css";
import arrowRight from "../../images/arrow-right.svg"
import arrowDown from "../../images/arrow-down.svg"
import GenreCard from "./GenreCard";

function ExploreWorks(props) {

    const [arrowPressed, setArrowPressed] = useState(false);
    const [arrowSVG, setArrowSVG] = useState(arrowRight);

    function changeArrowSVG() {
        setArrowPressed(!arrowPressed);
        !arrowPressed ? setArrowSVG(arrowDown) : setArrowSVG(arrowRight);
    }

    return (
        <div className="exploreCard">
            <div className="exploreButton" onClick={changeArrowSVG}>
                <span>Explore Works</span>
                <img id="arrow-img" src={arrowSVG} width="25px" />
            </div>

            <div className="exploreGenres">
                {arrowPressed && props.genres.map((genre, index) => {
                    return <GenreCard viewWorksByGenre={props.viewWorksByGenre} key={index} genre={genre} />
                })}
            </div>
        </div>
    )
}

export default ExploreWorks;