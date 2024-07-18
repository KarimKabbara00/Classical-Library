import React from "react";
import BirthdayWorkCard from "./BirthdayWorkCard";
import styles from "../../css/homepage.module.css";

function BirthdayCard(props) {

    return (
        <div id={props.index} style={{ minWidth: "100%", padding: "1rem" }}>
            <div className={styles.birthdayCardHeader}>
                <div className={styles.birthdayCardComposerName}>{props.composer.complete_name}</div>
                <div>{props.composer.dob}</div>
            </div>
            <div className={styles.portraitAndWorks}>
                <img src={props.composer.portrait} width="200px" />
                <div style={{ width: "75%" }}>
                    <div className={styles.recommendedWorksTitle}>Recommended Works</div>
                    <div className={styles.recommendedWorksParent}>
                        {props.fourWorks.map((work, index) => {
                            return <BirthdayWorkCard
                                key={index}
                                work={work}
                                darkModeEnabled={props.darkModeEnabled}
                                composerName={props.composer.complete_name}
                                composerPortrait={props.composer.portrait}
                                // music
                                url={work.url}
                                fetchAudio={props.fetchAudio}
                                audioObject={props.audioObject}
                                setAnotherRequest={props.setAnotherRequest}
                            />
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BirthdayCard;