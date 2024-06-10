import React from "react";
import styles from "../../css/searchResult.module.css"

function Card(props) {

    function goToComposerPage() {
        props.goToComp(props.compID)
    }

    return (
        <span onClick={goToComposerPage} className={styles.searchResultLink}>
            <div className={styles.searchResultItem}>
                <img className={styles.searchResultImage} alt="composer portrait" src={props.compPortrait} width="100px" />
                <span className={styles.searchResultName}>{props.compName}</span>
            </div>
        </span>
    )

}

export default Card;