import React from "react";
import "../../css/viewWorks.css"
import WorkColumnTitle from "./WorkColumnTitle";

function WorkHeader() {

    return (
        <div className="workHeader">
            <WorkColumnTitle colTitle={"Title"}/>
            <WorkColumnTitle colTitle={"Genre"}/>
        </div>
    )
}

export default WorkHeader;