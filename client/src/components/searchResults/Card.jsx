import React from "react";
import "../../css/searchResult.css"

function Card(props) {

    function goToComposerPage() {
        props.goToComp(props.compID)
    }

    return (
        <a onClick={goToComposerPage} className="searchResultLink">
            <div className="searchResultItem">
                <img className="searchResultImage" src={props.compPortrait} width="100px" />
                <span className="searchResultName">{props.compName}</span>
            </div>
        </a>
    )

}

export default Card;