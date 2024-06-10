import React from "react";
import styles from "../../css/viewWorks.module.css";
import WorkColumnTitle from "./WorkColumnTitle";

function WorkHeader(props) {

    return (
        <div className={styles.workHeader}>
            <WorkColumnTitle sortWorks={props.sortWorks} colTitle={"Title"} />
            <WorkColumnTitle sortWorks={props.sortWorks} colTitle={"Genre"} />
        </div>
    )
}

export default WorkHeader;