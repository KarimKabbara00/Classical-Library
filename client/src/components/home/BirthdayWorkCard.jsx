import React from "react";
import styles from "../../css/homepage.module.css";
import PlayMusic from "../shared/PlayMusic";

function BirthdayWorkCard(props) {
    return (
        <div style={{ minWidth: "100%" }}>
            <div className={styles.recommendedWorks}>
                <span>{props.work.title}</span>
                <PlayMusic urlOrID={props.url} title={props.workTitle} composer={props.completeName} fetchAudio={props.fetchAudio} byUrl={true} />
            </div>
        </div>
    )
}

export default BirthdayWorkCard;