import React from "react";
import styles from "../../css/viewWorks.module.css";
import WorkColumnTitle from "./WorkColumnTitle";

function WorkHeader(props) {

    return (
        <div className={styles.workHeader}>
            <WorkColumnTitle currentGenre={props.currentGenre} sortWorks={props.sortWorks} colTitle={"Title"} />
            <WorkColumnTitle currentGenre={props.currentGenre} sortWorks={props.sortWorks} colTitle={"Genre"} />
            <WorkColumnTitle currentGenre={props.currentGenre} sortWorks={props.sortWorks} colTitle={"Duration"} />
        </div>
    )
}

export default WorkHeader;