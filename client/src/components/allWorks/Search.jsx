import React, { useEffect, useState } from "react";
import styles from "../../css/allWorks.module.css";
import Fuse from "fuse.js";

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

                // reg ex searches through gigantic string of the following form:
                // ^__^workID$$workTitle$$completeName^__^
                // keeping the top 100 matches to inputText 
                // Searches between ^__^, ignoring $$
                var rx = new RegExp('\\^__\\^((\\d+\\$\\$[^\\^]*' + inputText + '[^\\^]*)\\^__\\^)', 'gi');
                var i = 0;
                var results = "";
                var result = ""
                while (result = rx.exec(props.allWorks)) {
                    results += "^__^" + result[1];
                    i += 1;
                    if (i >= 200)
                        break;
                }

                let splitResult = results.split("^__^"); // splits into array
                let shownWorksObject = []; // works to show
                for (let i = 0; i < splitResult.length; i++) {
                    let split = splitResult[i].split("$$");
                    if (split[0] === "")
                        continue;
                    shownWorksObject.push({
                        workID: split[0],
                        workTitle: split[1],
                        complete_name: split[2],
                        portrait: split[3]
                    })
                }
                props.setShownWorks(shownWorksObject);
            }

        }
    }

    const inputDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        borderBottom: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }

    return (
        <input onInput={updateEnteredText} className={styles.searchForWork} style={inputDarkMode} value={enteredText} placeholder="Search for work..." />
    )
}

export default Search;