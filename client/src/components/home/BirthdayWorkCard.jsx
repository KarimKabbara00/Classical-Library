import React from "react";
import styles from "../../css/homepage.module.css";
import playButton from "../../images/play.svg"

function BirthdayWorkCard(props) {
    return (
        <div>
            <div className={styles.recommendedWorks}>
                <span>Piano Sonata no. 29 in B flat major, op. 106, "Hammerklavier"</span>
                <img className={styles.playButton} src={playButton} width="30px" />
            </div>
        </div>
    )
}

export default BirthdayWorkCard;