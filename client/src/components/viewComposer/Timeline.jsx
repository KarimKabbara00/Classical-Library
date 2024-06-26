import React from "react";
import TimelineItem from "./TimelineItem";
import styles from "../../css/viewComposer.module.css";

function Timeline(props) {
    return (
        <div>
            <div className={styles.timeLineHeader}>Timeline</div>
            <div className={styles.timeLine}>
                <div className={styles.timeLineArt}>
                    <div className={styles.dot}></div>
                    <div className={styles.line}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.line}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.line}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.line}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={styles.timeLineWords}>
                    {props.events.map((PIT, index) => {
                        return <TimelineItem key={index} text={PIT} /> //Point in Time
                    })}
                </div>
            </div>
        </div>
    )
}

export default Timeline;