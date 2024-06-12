import React from "react";
import LetterHeader from "./LetterHeader";
import Card from "../../components/searchResults/Card";
import { useNavigate } from "react-router-dom";

import styles from "../../css/searchResult.module.css";

function LetterSection(props) {

    const navigate = useNavigate();

    function goToComp(compID) {
        navigate(`/viewComposer?id=${compID}`, { state: compID }); // navigate to /search with data
    }

    return (
        <div className={styles.sectionHeader}>
            {props.letterHeaderCount > 1 && props.composerArray.length > 0 && <LetterHeader letter={props.letter} />}
            <div className={styles.searchResultGrid}>
                {props.composerArray.map((composer) => (
                    <Card key={composer.id} compID={composer.id} compPortrait={composer.portrait} compName={composer.name} goToComp={goToComp} />
                ))}
            </div>
        </div >
    )
}

export default LetterSection;