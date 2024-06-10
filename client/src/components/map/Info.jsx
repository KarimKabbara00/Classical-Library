import React, { useState } from "react";
import infoBlack from "../../images/info-black.svg";
import infoGray from "../../images/info-gray.svg";
import styles from "../../css/map.module.css";

function Info() {

    const icons = [infoGray, infoBlack]
    const [infoIcon, setInfoIcon] = useState(icons[0])


    function setBlack() {
        setInfoIcon(icons[1])
    }

    function setGray() {
        setInfoIcon(icons[0])
    }

    return (
        <div onMouseOver={setBlack} onMouseOut={setGray} className={styles.infoParent}>
            <img src={infoIcon} alt="info-icon" width="25px" />
            <div className={styles.infoWords}>
                The map showcases the birthplace of every composer in the <span style={{ color: "brown", fontWeight: "bold" }}>Classical Library</span>
                . Click on a pin to learn more about that composer.
            </div>
        </div>
    )
}

export default Info;