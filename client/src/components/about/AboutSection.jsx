import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "../../css/about.module.css"
import arrowRight from "../../images/arrow-right.svg"
import arrowDown from "../../images/arrow-down.svg"

function AboutSection(props) {

    const [arrowPressed, setArrowPressed] = useState(false);
    const [arrowSVG, setArrowSVG] = useState(arrowRight);

    function changeArrowSVG() {
        setArrowPressed(!arrowPressed);
        !arrowPressed ? setArrowSVG(arrowDown) : setArrowSVG(arrowRight);
    }

    const sectionAnim = useSpring({
        height: arrowPressed ? props.maxHeight : "0rem",
        opacity: arrowPressed ? 1 : 0,
        config: { tension: 200, friction: 30, }
    });

    return (
        <div className={styles.sectionGroup}>
            <div name="aboutMe" className={styles.sectionTitle} onClick={changeArrowSVG}>
                <span>{props.title}</span>
                <img src={arrowSVG} width="25px" alt="ArrowSVG" />
            </div>
            <animated.span style={sectionAnim} className={styles.sectionDesc}>
                {props.description}
            </animated.span>
        </div>
    )
}

export default AboutSection;