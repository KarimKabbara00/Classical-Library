import React, { useState } from "react";
import Dropdown from "./Dropdown";
import composerList from "../../composerList";
import "../../css/homepage.css";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownList, setDropdownList] = useState([]);
  const [optionsExist, setOptionsExist] = useState(false);

  function handleChange(event) {
    const currentSearchTerm = event.target.value;
    setSearchTerm(currentSearchTerm);

    let options = composerList.filter((result) => result.name.toLowerCase().includes(currentSearchTerm));
    setDropdownList(options);
    setOptionsExist(options.length > 0 && currentSearchTerm !== "");
  }

  // send up the chain: SearchBar > Home > App
  function onQuery(event) {
    props.onQuery(searchTerm);
    event.preventDefault();
  }

  return (
    <div>
      <form method="POST" onSubmit={onQuery} autoComplete="off" id="inputForm">
        <div className="searchBarBody">
          <label className="searchBarTitle" htmlFor="queryComposer">
            Search for a composer...
          </label>
          <input onChange={handleChange} className="searchBarEntry" type="text" name="searchBar" value={searchTerm} required /> {/* id="queryComposer" */}
          {optionsExist && props.inputFocused && <Dropdown options={dropdownList} />}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
