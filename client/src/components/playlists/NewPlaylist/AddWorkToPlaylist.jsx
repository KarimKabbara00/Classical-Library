import React, { useEffect, useState } from "react";
import styles from "../../../css/playlists.module.css";
import WorkDropdownList from "./WorkDropdownList";
import searchBlack from "../../../images/searchBlack.svg";
import searchWhite from "../../../images/searchWhite.svg";

function AddWorkToPlaylist(props) {

    const [enteredText, setEnteredText] = useState("");
    function updateEnteredText(event) {
        const val = event.target.value;
        setEnteredText(val);
        updateDDLOptions(val)
    }

    const [shownWorks, setShownWorks] = useState([]);
    const [inputFieldFocused, setInputFieldFocused] = useState(false);
    function updateDDLOptions(inputText) {
        if (inputText === "" || inputText === null) {
            setShownWorks(props.allWorks);
        }
        else {
            if (inputText.length < 3) {
                setShownWorks([{ workID: -1, workTitle: "Search term too short", complete_name: "" }]);
            }
            else {
                let filteredWorks = props.indexGiganticString(inputText)
                setShownWorks(filteredWorks)
            }

        }
    }

    function addWork(workID, title, complete_name) {
        if (workID === -1)
            return;
        props.addWork({
            workID: workID,
            title: title,
            complete_name: complete_name
        })
        setEnteredText("");
        updateDDLOptions("");
    }

    const inputDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        borderBottom: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }

    const dropdownListParentDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
    }

    const [searchSVG, setSearchSVG] = useState(searchBlack);
    useEffect(() => {
        props.darkModeEnabled ? setSearchSVG(searchWhite) : setSearchSVG(searchBlack)
    }, [props.darkModeEnabled])

    return (
        <div>
            <div className={styles.searchForWorkItem}>
                <div className={styles.searchParent}>
                    <input onFocus={() => setInputFieldFocused(true)} onBlur={() => setTimeout(() => setInputFieldFocused(false), 150)} onInput={updateEnteredText} className={styles.searchForWork} style={inputDarkMode} value={enteredText} placeholder="Search for work..." />
                    <img className={styles.searchIcon} src={searchSVG} width="22px" />
                </div>

                {inputFieldFocused && shownWorks.length > 0 && props.allWorks.length !== shownWorks.length &&
                    <div style={dropdownListParentDarkMode} className={styles.dropdownListParent}>
                        <WorkDropdownList worksToAdd={props.worksToAdd} inputFieldFocused={inputFieldFocused} addWork={addWork} shownWorks={shownWorks} darkModeEnabled={props.darkModeEnabled} />
                    </div>
                }
            </div>
        </div >


    )
}

export default AddWorkToPlaylist;