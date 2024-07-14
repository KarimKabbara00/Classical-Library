import React, { useState } from "react";
import styles from "../../css/allComposers.module.css"
import allWhite from "../../images/all-white.svg"
import allBrown from "../../images/all-brown.svg"
import shuffleWhite from "../../images/shuffle-white.svg"
import shuffleBrown from "../../images/shuffle-brown.svg"


function Button(props) {

    // index 0 for non hover, 1 for hover
    const svgs = props.buttonType === "Shuffle" ? [shuffleBrown, shuffleWhite] : [allBrown, allWhite];

    const [isHovered, setIsHovered] = useState(false);
    const [svgIcon, setSVGIcon] = useState(svgs[0]);

    function changeSVGHover() {
        setIsHovered(!isHovered);
        !isHovered ? setSVGIcon(svgs[1]) : setSVGIcon(svgs[0]);
    }

    function grabAllComposers() {
        props.buttonAction("all");
    }

    const ButtonDarkMode = {
        border: props.darkModeEnabled ? "1px solid #e8e6e3" : ""
    }

    return (
        <form method="POST" autoComplete="off">
            <button type="button" className={styles.button} style={ButtonDarkMode} onMouseEnter={changeSVGHover} onMouseLeave={changeSVGHover} onClick={grabAllComposers}><img className={styles.buttonImage} alt={props.buttonText} src={svgIcon} width="20px" />{props.buttonText}</button>
        </form>
    )


}

export default Button;