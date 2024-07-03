import React, { useState } from "react";
import styles from "../../css/playlists.module.css";
import WorkDropdownList from "./WorkDropdownList";
import x from "../../images/x.svg"
import deburr from 'lodash/deburr';
import Fuse from "fuse.js";

function AddWorkToPlaylist(props) {

    const [enteredText, setEnteredText] = useState("");
    const [workToAdd, setWorkToAdd] = useState(null);
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
                    threshold: 0.3,         // 0 - 1, 0 being exact, 1 being anything
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

    function selectWork(workID) {
        let selectedWork = shownWorks.filter(work => {
            return work.workID === workID;
        })[0];

        setWorkToAdd({
            workID: selectedWork.workID,
            title: selectedWork.workTitle,
            complete_name: selectedWork.complete_name,
        })

        // pass up to main form at NewPlaylist.jsx
        props.addWork(selectedWork);
    }

    const [renderSelf, setRenderSelf] = useState(true);
    function destroySelf() {

        // TODO REMOVE SELF FROM HERE
        // COULD WE MOVE ADD TO HERE INSTEAD OF FROM NewPlaylist.jsx???
        props.setWorksToAdd()

        // if first is deleted
        if (props.first === true) {
            // if first has a selected work and there are more selected works beneath it, unrender it
            if (props.worksToAdd.length[0] !== null && props.worksToAdd.length > 1) {
                setRenderSelf(false);
            }
            // otherwise, clear it
            else {
                setWorkToAdd(null)
                setEnteredText("");
            }
        }
        if (props.first !== true)
            setRenderSelf(false);

    }

    return (
        <div>
            {renderSelf && workToAdd && <div className={styles.addedWork}>
                <span>{workToAdd.title}</span>
                <span>by {workToAdd.complete_name}</span>
                <span className={styles.deleteButton}><img onClick={destroySelf} src={x} width="20px" /></span>
            </div>}

            {renderSelf && !workToAdd && <div className={styles.searchForWorkItem}>
                {/* setTimeout gives enough time to call selectWork() before hiding DDL */}
                <input onFocus={() => setInputFieldFocused(true)} onBlur={() => setTimeout(() => setInputFieldFocused(false), 100)} onInput={updateEnteredText} className={styles.searchForWork} value={enteredText} placeholder="Search for work..." />
                <div className={styles.deleteButton}><img onClick={destroySelf} src={x} width="20px" /></div>
                {inputFieldFocused && shownWorks.length > 0 && props.allWorks.length !== shownWorks.length &&
                    <div className={styles.dropdownListParent}>
                        {/* pass worksToAdd to disable already selected choices */}
                        <WorkDropdownList worksToAdd={props.worksToAdd} shownWorks={shownWorks} selectWork={selectWork} />
                    </div>
                }
            </div>}
        </div >


    )
}

export default AddWorkToPlaylist;