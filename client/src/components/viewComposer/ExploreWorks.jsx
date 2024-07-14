import React, { useState } from "react";
import styles from "../../css/viewComposer.module.css";
import arrowRight from "../../images/arrow-right.svg"
import arrowDown from "../../images/arrow-down.svg"
import GenreCard from "./GenreCard";

function ExploreWorks(props) {

    const [arrowPressed, setArrowPressed] = useState(true);
    const [arrowSVG, setArrowSVG] = useState(arrowDown);

    function changeArrowSVG() {
        setArrowPressed(!arrowPressed);
        !arrowPressed ? setArrowSVG(arrowDown) : setArrowSVG(arrowRight);
    }
    
    // -------------------- Dark Mode -------------------- //
    const textDarkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div className={styles.exploreCard}>
            <div className={styles.exploreButton} onClick={changeArrowSVG}>
                <span style={textDarkMode}>Explore Works</span>
                <img alt="explore-arrow" src={arrowSVG} width="25px" />
            </div>

            <div className={styles.exploreGenres} >
                {arrowPressed && props.genres.map((genre, index) => {
                    return <GenreCard viewWorksByGenre={props.viewWorksByGenre} key={index} genre={genre} darkModeEnabled={props.darkModeEnabled} />
                })}
            </div>
        </div>
    )
}

export default ExploreWorks;