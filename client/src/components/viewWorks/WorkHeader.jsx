import React from "react";
import styles from "../../css/viewWorks.module.css";
import WorkColumnTitle from "./WorkColumnTitle";

function WorkHeader(props) {

    return (
        <div className={styles.workHeader}>
            <WorkColumnTitle currentGenre={props.currentGenre} sortWorks={props.sortWorks} colTitle={"Title"} darkModeEnabled={props.darkModeEnabled} />
            <WorkColumnTitle currentGenre={props.currentGenre} sortWorks={props.sortWorks} colTitle={"Genre"} darkModeEnabled={props.darkModeEnabled} />
            <WorkColumnTitle currentGenre={props.currentGenre} sortWorks={props.sortWorks} colTitle={"Duration"} darkModeEnabled={props.darkModeEnabled} />
        </div>
    )
}

export default WorkHeader;