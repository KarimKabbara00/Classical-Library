import React, { useEffect, useState } from "react";
import styles from "../../css/allWorks.module.css";
import searchBlack from "../../images/searchBlack.svg";
import searchWhite from "../../images/searchWhite.svg";

function Search(props) {

    const [enteredText, setEnteredText] = useState("");
    function updateEnteredText(event) {
        const val = event.target.value;
        setEnteredText(val);
        updateDDLOptions(val)
    }

    function updateDDLOptions(inputText) {
        if (inputText === "" || inputText === null) {
            props.setShownWorks([]);
        }
        else {
            if (inputText.length < 3) {
                props.setShownWorks([{ workID: -1, workTitle: "Search term too short", complete_name: "" }]);
            }
            else {
                props.indexGiganticString(inputText)
            }
        }
    }

    const [searchSVG, setSearchSVG] = useState(searchBlack);
    useEffect(() => {
        props.darkModeEnabled ? setSearchSVG(searchWhite) : setSearchSVG(searchBlack)
    }, [props.darkModeEnabled])

    const inputDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        borderBottom: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }

    return (
        <div className={styles.searchParent}>
            <input onInput={updateEnteredText} className={styles.searchForWork} style={inputDarkMode} value={enteredText} placeholder="Search for work..." />
            <img className={styles.searchIcon} src={searchSVG} width="22px" />
        </div>

    )
}

export default Search;