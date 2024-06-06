import React from "react";
import "../../css/searchResult.css"

function Card(props) {

    function goToComposerPage() {
        props.goToComp(props.compID)
    }

    return (
        <span onClick={goToComposerPage} className="searchResultLink">
            <div className="searchResultItem">
                <img className="searchResultImage" alt="composer portrait" src={props.compPortrait} width="100px" />
                <span className="searchResultName">{props.compName}</span>
            </div>
        </span>
    )

}

export default Card;