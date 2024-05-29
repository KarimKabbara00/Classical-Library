import React, { useState } from "react";
import Dropdown from "./Dropdown";
import composerList from "../../composerList"
import "../../css/homepage.css"

function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownList, setDropdownList] = useState([]);
    const [optionsExist, setOptionsExist] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    function handleChange(event) {
        const currentSearchTerm = event.target.value;
        setSearchTerm(currentSearchTerm);

        let options = composerList.filter((result) => result.name.toLowerCase().includes(currentSearchTerm));
        setDropdownList(options);
        setOptionsExist(options.length > 0 && currentSearchTerm !== "");
    }

    // send up the chain: SearchBar > Home > App
    function onQuery(event) {
        props.onQuery(searchTerm)
        event.preventDefault()
    }

     // when the input is clicked in or out of
    function onInputFocusOrBlur() {
        setInputFocused((prev) => !prev)
    }

    return (
        <div>
            <form method="POST" onSubmit={onQuery} autoComplete="off" id="inputForm">
                <div className="searchBarBody">
                    <label className="searchBarTitle" htmlFor="queryComposer">Search for a composer...</label>
                    <input onChange={handleChange} className="searchBarEntry" type="text" id="queryComposer" name="queryComposer" value={searchTerm} onFocus={onInputFocusOrBlur} onBlur={onInputFocusOrBlur} required />
                    {optionsExist && inputFocused && <Dropdown options={dropdownList} />}
                </div>
            </form>
        </div>
    );
}

export default SearchBar;