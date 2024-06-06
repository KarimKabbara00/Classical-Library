import React from "react";
import "../../css/viewWorks.css"
import WorkColumnTitle from "./WorkColumnTitle";

function WorkHeader(props) {

    return (
        <div className="workHeader">
            <WorkColumnTitle sortWorks={props.sortWorks} colTitle={"Title"}/>
            <WorkColumnTitle sortWorks={props.sortWorks} colTitle={"Genre"}/>
        </div>
    )
}

export default WorkHeader;