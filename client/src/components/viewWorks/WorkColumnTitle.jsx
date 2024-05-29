import React, { useState } from "react";
import arrowRight from "../../images/arrow-right.svg"
import arrowDown from "../../images/arrow-down.svg"
import arrowUp from "../../images/arrow-up.svg"
import "../../css/viewWorks.css"

function WorkColumnTitle(props) {

    const [arrowPressed, setArrowPressed] = useState(false);
    const [arrowSVG, setArrowSVG] = useState(arrowRight);

    function changeSVGIcon() {
        setArrowPressed(!arrowPressed)
        !arrowPressed ? setArrowSVG(arrowDown) : setArrowSVG(arrowUp)
    }

    return (
        <span onClick={changeSVGIcon} className="workHeaderField">{props.colTitle}<img alt="sortArrow" src={arrowSVG} width="25px" /></span>
    )
}

export default WorkColumnTitle;