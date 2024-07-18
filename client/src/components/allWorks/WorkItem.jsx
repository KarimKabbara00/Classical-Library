import React from "react";
import PlayMusic from "../shared/PlayMusic"
import styles from "../../css/allWorks.module.css";

function WorkItem(props) {

    const workCardDarkMode = {
        borderBottom: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }

    return (
        <>
            {props.workID !== -1 && <div className={styles.workCard} style={workCardDarkMode}>
                <span>{props.workTitle}</span>
                <span>{props.completeName}</span>
                <PlayMusic
                    urlOrID={props.workID}
                    title={props.workTitle}
                    composer={props.completeName}
                    byUrl={false}
                    fetchAudio={props.fetchAudio}
                    audioObject={props.audioObject}
                    setAnotherRequest={props.setAnotherRequest}
                />
            </div>}
            {props.workID === -1 && <div className={styles.noResults}>
                <span>{props.workTitle}</span>
            </div>}
        </>
    )
}

export default WorkItem;