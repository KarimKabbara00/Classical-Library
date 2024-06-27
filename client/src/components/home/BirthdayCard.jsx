import React from "react";
import BirthdayWorkCard from "./BirthdayWorkCard";
import styles from "../../css/homepage.module.css";

function BirthdayCard(props) {

    return (
        <div id={props.index} style={{ minWidth: "100%" }}>
            <h3>{props.composer.complete_name} COMPOSERIMAGE WORKIMAGE</h3>
            <div>{props.composer.birth}</div>
            <div className={styles.portraitAndWorks}>
                <img src={props.composer.portrait} width="200px" />
                <div>
                    <h4>Recommended Works</h4>
                    <BirthdayWorkCard />
                    <BirthdayWorkCard />
                    <BirthdayWorkCard />
                    <BirthdayWorkCard />
                </div>
            </div>
        </div>

    )
}

export default BirthdayCard;