import React, { useEffect, useState } from "react";
import arrowRight from "../../images/arrow-right.svg"
import arrowDown from "../../images/arrow-down.svg"
import arrowUp from "../../images/arrow-up.svg"
import styles from "../../css/viewWorks.module.css";

function WorkColumnTitle(props) {

    const [arrowPressed, setArrowPressed] = useState(false);
    const [arrowSVG, setArrowSVG] = useState(arrowRight);

    function changeSVGIcon() {
        setArrowPressed(!arrowPressed);
        !arrowPressed ? setArrowSVG(arrowDown) : setArrowSVG(arrowUp);
        props.sortWorks(props.colTitle.toLocaleLowerCase(), arrowPressed);
    }

    // rerender if currentGenre changes to rest sorting
    useEffect(() => {
        setArrowPressed(false);
        setArrowSVG(arrowRight);
        props.sortWorks(props.colTitle.toLocaleLowerCase(), false);
    }, [props.currentGenre]); 

    return (
        <span onClick={changeSVGIcon} className={styles.workHeaderField}>{props.colTitle}<img alt="sortArrow" src={arrowSVG} width="25px" /></span>
    )
}

export default WorkColumnTitle;