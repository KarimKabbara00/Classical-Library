import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import FilterItems from "../components/shared/FilterItems";
import Loading from "../components/Loading";
import styles from "../css/searchResult.module.css";
import loadingStyles from "../css/loading.module.css";
import BackToTop from "../components/shared/BackToTop";
import deburr from 'lodash/deburr';
import LetterSection from "../components/searchResults/LetterSection";

function sortWorks(works) {

  // sort alphabetically by last name
  works = works.sort((a, b) => a.name.split(" ").pop(0).charAt(0) > b.name.split(" ").pop(0).charAt(0))

  let alphabetObject = {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
    "I": [],
    "J": [],
    "K": [],
    "L": [],
    "M": [],
    "N": [],
    "O": [],
    "P": [],
    "Q": [],
    "R": [],
    "S": [],
    "T": [],
    "U": [],
    "V": [],
    "W": [],
    "X": [],
    "Y": [],
    "Z": []
  };

  // place composers into alphabet object my last name initial
  for (let i of works) {
    // get last name inital
    let lastNameInitial = i.name.split(" ").pop(0).charAt(0).toLocaleUpperCase();
    // if last initial not in object, add it
    if (!(lastNameInitial in alphabetObject)) {
      alphabetObject[lastNameInitial] = [];
    }
    // place it 
    alphabetObject[lastNameInitial].push(i);
  }

  // remove empty arrays
  alphabetObject = Object.fromEntries(
    Object.entries(alphabetObject).filter(([key, value]) => value.length > 0)
  );

  return alphabetObject;
}

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  // receive data from Home.jsx
  const query = location.state ? location.state.searchTerm : "";
  const [allResults, setAllResults] = useState([]);
  const [shownResults, setShownResults] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    axios
      .post(`http://localhost:3001/search?q=${query}`)
      .then(function (res) {
        // sort alphabetically by last name
        // let sortedResults = res.data.searchResult.sort((a, b) => a.name.split(" ").pop(0).charAt(0) > b.name.split(" ").pop(0).charAt(0));
        let sortedResults = sortWorks(res.data.searchResult);
        setAllResults(sortedResults);
        setShownResults(sortedResults);
        setShowLoading(false);
      })
      .catch(function (err) {
        console.log(err)
        console.log(err.response.data.searchResult);
        navigate("/", { state: { error: true, errorMsg: err.response.data.searchResult } });
      });
  }, [query, navigate]);

  function filterComposers(filter) {
    if (!filter) {
      // show all
      setShownResults(allResults);
    } else {
      var filteredResults = Object.fromEntries( // transform from [key, value] into {key: value}
        Object.entries(allResults).map(([letter, composers]) => [  // for every letter and array of composer objs
          // keep the letter, and filter the sub object based on the name and filter
          letter,
          composers.filter(composer => deburr(composer.name).toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').includes(filter))
        ])
      );
      setShownResults(filteredResults);
    }
  }

  // slide up or down loading
  const loadingStyling = classNames({
    [loadingStyles.loadingParent]: true,
    [loadingStyles.applySlideDown]: showLoading,
    [loadingStyles.applySlideUp]: !showLoading,
  });

  const contentStyling = classNames({
    [styles.searchResultParent]: true,
    [styles.applyFadeIn]: !showLoading,
  });

  // screen height when loading or not
  const dynamicHeight = {
    minHeight: "90vh",
    height: showLoading ? "90vh" : ""
  };

  return (
    <div className={styles.searchResMainBody} style={dynamicHeight}>
      <div className={loadingStyling}>
        <Loading />
      </div>

      {!showLoading && <div className={contentStyling} >
        <BackToTop />
        <h1 className={styles.searchResultTitle}>
          {query !== "all" ? (
            <span>
              Top results for <span className={styles.query}>{query}</span>
            </span>
          ) : (
            "All Composers"
          )}
        </h1>
        <div className={styles.searchResultBody}>
          <FilterItems filterItems={filterComposers} placeholderText={"Filter composers here..."} />
          {shownResults.length === 0 ? (
            <div className={styles.noResults}>No Results Found</div>
          ) : (
            Object.entries(shownResults).map(([letter, composers]) => (
              <LetterSection key={letter} letterHeaderCount={Object.keys(shownResults).length} composerArray={composers} letter={letter} />
            ))
          )}
        </div>
      </div>}
    </div>
  );
}

export default SearchResults;
