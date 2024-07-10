import React, { useEffect, useState } from "react";
import styles from "../../../css/playlists.module.css";
import WorkDropdownList from "./WorkDropdownList";
import Fuse from "fuse.js";

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
                const options = {
                    keys: ["workTitle"],    // filter by this key
                    threshold: 0.2,         // 0 - 1, 0 being exact, 1 being anything
                    shouldSort: true        // sort by most matching
                }
                const fuse = new Fuse(props.allWorks, options); // create fuse object with all the works, and the options
                const result = fuse.search(inputText);  // search

                // const result is a list of objects about the query. Eahc object contains the key item which is the work object
                const filteredResults = result.map(item => item.item);
                setShownWorks(filteredResults);
            }

        }
    }

    function addWork(workID, title, complete_name) {
        props.addWork({
            workID: workID,
            title: title,
            complete_name: complete_name
        })
        setEnteredText("");
        updateDDLOptions("");
    }

    return (
        <div>
            <div className={styles.searchForWorkItem}>
                <input onFocus={() => setInputFieldFocused(true)} onBlur={() => setTimeout(() => setInputFieldFocused(false), 150)} onInput={updateEnteredText} className={styles.searchForWork} value={enteredText} placeholder="Search for work..." />
                {inputFieldFocused && shownWorks.length > 0 && props.allWorks.length !== shownWorks.length &&
                    <div className={styles.dropdownListParent}>
                        <WorkDropdownList worksToAdd={props.worksToAdd} inputFieldFocused={inputFieldFocused} addWork={addWork} shownWorks={shownWorks} />
                    </div>
                }
            </div>
        </div >


    )
}

export default AddWorkToPlaylist;