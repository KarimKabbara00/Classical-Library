import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import backToTopBrown from "../../images/back-to-top-brown.svg";
import backToTopWhite from "../../images/back-to-top-white.svg";
import styles from "../../css/shared.module.css";

function BackToTop() {

    const [hovered, setHovered] = useState(false);
    const [hoveredSVG, setHoveredSVG] = useState(backToTopBrown);
    const [showButton, setShowButton] = useState(false);

    function onAction() {
        setHovered((prev) => !prev);
        !hovered ? setHoveredSVG(backToTopWhite) : setHoveredSVG(backToTopBrown)
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    function toggleScrollButton() {
        if (window.scrollY > 300) {
            setShowButton(true);
        }
        else {
            setHovered(false);
            setHoveredSVG(backToTopBrown);
            setShowButton(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleScrollButton)
        return () => {
            window.removeEventListener("scroll", toggleScrollButton)
        }
    }, []);

    const anim = useSpring({
        from: { transform: showButton ? "translateX(300%)" : "translateX(0%)" },
        to: { transform: showButton ? "translateX(0%)" : "translateX(300%)" },
        config: { tension: 200, friction: 30 },
    });

    return (
        <animated.div style={anim} onClick={scrollToTop} className={styles.backToTop} onMouseEnter={onAction} onMouseLeave={onAction}>
            <img src={hoveredSVG} width="25px" />
        </animated.div>
    )
}

export default BackToTop;