import React, { useState } from "react";
import infoBlack from "../../images/info-black.svg";
import infoBrown from "../../images/info-brown.svg";
import styles from "../../css/map.module.css";

function Info() {

    const icons = [infoBlack, infoBrown]
    // const [infoHovered, setInfoHovered] = useState(false);
    const [infoIcon, setInfoIcon] = useState(icons[0])

    function setBlack() {
        setInfoIcon(icons[0])
    }

    function setBrown() {
        setInfoIcon(icons[1])
    }

    return (
        <div onMouseOver={setBrown} onMouseOut={setBlack}>
            <img className={styles.infoIcon} src={infoIcon} alt="info-icon" width="20px" />
            <div className={styles.infoWords}>
                The map showcases the birthplace of every composer in the <span style={{ color: "brown", fontWeight: "bold" }}>Classical Library</span>
                . Click on a pin to learn more about that composer.
            </div>
        </div>
    )
}

export default Info;