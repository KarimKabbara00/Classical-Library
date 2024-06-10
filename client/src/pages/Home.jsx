import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/home/SearchBar";
import Button from "../components/home/Button";
import QueryError from "../components/home/QueryError";
import composerList from "../composerList";
import styles from "../css/homepage.module.css"

function Home() {
  const navigate = useNavigate();

  // circular navigate. Home sends query to SearchResults. If query is fine,
  // stay there and render results. Otherwise, navigate back here with error message
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setError(location.state ? location.state.error : false);
    setErrorMsg(location.state ? location.state.errorMsg : false);
  }, [location.state]);

  // Receive from SearchBar
  function onQuery(searchTerm) {
    navigate(`/search?q=${searchTerm}`, { state: { searchTerm: searchTerm } });
  }

  function randomComposer() {
    let random = Math.floor(Math.random() * composerList.length);
    let compID = composerList[random].id;
    navigate(`/viewComposer?id=${compID}`);
  }

  const [inputFocused, setInputFocused] = useState(true);
  const handleClick = useCallback((event) => {
    if (event.target.closest(".dropdownSuggestions") || event.target.name === "searchBar") {
      setInputFocused(true);
    } else {
      setInputFocused(false);
    }
  }, []);

  return (
    <div className={styles.homeBody} style={{ height: "100vh" }}>
      <div className={styles.searchAndButtons} onClick={handleClick}>
        <SearchBar inputFocused={inputFocused} onQuery={onQuery} />
        <div className={styles.buttonParent}>
          <Button buttonType="Shuffle" buttonText="Shuffle Composers" buttonAction={randomComposer} />
          <Button buttonType="All" buttonText="View All Composers" buttonAction={onQuery} />
        </div>
        {error && <QueryError errorMessage={errorMsg} />}
      </div>
      <div>
        other stuff
      </div>
    </div>
  );
}

export default Home;
