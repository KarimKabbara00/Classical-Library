import React, { useState } from "react";
import "../../css/homepage.css"
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
        isHovered ? setSVGIcon(svgs[0]) : setSVGIcon(svgs[1]);
    }

    function grabAllComposers() {
        props.buttonAction("all");
    }

    return (
        <form method="POST" autoComplete="off">
            <button type="button" className="button" onMouseEnter={changeSVGHover} onMouseLeave={changeSVGHover} onClick={grabAllComposers}><img className="buttonImage" alt={props.buttonText} src={svgIcon} width="20px" />{props.buttonText}</button>
        </form>
    )


}

export default Button;