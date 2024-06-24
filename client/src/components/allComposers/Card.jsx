import React from "react";
import styles from "../../css/allComposers.module.css"

function Card(props) {

    function goToComposerPage() {
        props.goToComp(props.compID)
    }

    return (
        <span onClick={goToComposerPage} className={styles.allCompItemLink}>
            <div className={styles.allCompItem}>
                <img className={styles.allCompItemImage} alt="composer portrait" src={props.compPortrait} width="100px" />
                <span className={styles.allCompItemName}>{props.compName}</span>
            </div>
        </span>
    )

}

export default Card;