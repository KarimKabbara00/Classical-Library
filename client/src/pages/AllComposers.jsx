import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import FilterItems from "../components/shared/FilterItems";
import Loading from "../components/shared/Loading";
import styles from "../css/allComposers.module.css";
import loadingStyles from "../css/loading.module.css";
import BackToTop from "../components/shared/BackToTop";
import deburr from 'lodash/deburr';
import LetterSection from "../components/allComposers/LetterSection";
import Button from "../components/allComposers/Button";

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

function AllComposers(props) {
  const navigate = useNavigate();

  // receive data from Home.jsx
  const [allResults, setAllResults] = useState([]);
  const [shownResults, setShownResults] = useState([]);
  const [composerCount, setComposerCount] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    axios
      .get("http://localhost:3001/api/allComposers")
      .then(function (res) {
        // sort composers by last name initial
        let sortedResults = sortWorks(res.data.allComposers);
        setAllResults(sortedResults);
        setShownResults(sortedResults);
        setFilteredResultsCount(countFilteredResults(sortedResults));
        setComposerCount(res.data.allComposers.length);
        setShowLoading(false);
      })
      .catch(function (err) {
        console.log(err)
        navigate("/", { state: { error: true, errorMsg: err.response.data.allComposers } });
      });
  }, [navigate]);

  function filterComposers(filter) {
    if (!filter) {
      // show all
      setShownResults(allResults);
      setFilteredResultsCount(countFilteredResults(allResults));
    } else {
      var filteredResults = Object.fromEntries( // transform from [key, value] into {key: value}
        Object.entries(allResults).map(([letter, composers]) => [  // for every letter and array of composer objs
          // keep the letter, and filter the sub object based on the name and filter
          letter,
          composers.filter(composer => deburr(composer.name).toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').includes(filter))
        ])
      );
      setShownResults(filteredResults);
      setFilteredResultsCount(countFilteredResults(filteredResults));
    }
  }

  const [filteredResultsCount, setFilteredResultsCount] = useState(null);
  function countFilteredResults(filteredResults) {
    let totalCount = 0;
    for (let i of Object.keys(filteredResults)) {
      totalCount += filteredResults[i].length;
    }
    return totalCount;
  }

  function randomComposer() {
    let randomID = Math.floor(Math.random() * composerCount) + 1;
    navigate(`/viewComposer?id=${randomID}`);
  }

  // slide up or down loading
  const loadingStyling = classNames({
    [loadingStyles.loadingParent]: true,
    [loadingStyles.applySlideDown]: showLoading,
    [loadingStyles.applySlideUp]: !showLoading,
  });

  const contentStyling = classNames({
    [styles.allCompParent]: true,
    [styles.applyFadeIn]: !showLoading,
  });

  // -------------------- Dark Mode -------------------- //
  const allCompMainBodyDarkMode = {
    backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
    color: props.darkModeEnabled ? "#e8e6e3" : "",
    height: "94.5vh"
  }
  // -------------------- Dark Mode -------------------- //

  return (
    <div id="allCompMainBody" className={styles.allCompMainBody} style={allCompMainBodyDarkMode}>
      <div className={loadingStyling}>
        <Loading loadingText={"Grabbing all composers..."} darkModeEnabled={props.darkModeEnabled} />
      </div>

      {!showLoading && <div className={contentStyling} >
        <BackToTop elementId={"allCompMainBody"} triggerAtY={300} />
        <h1 className={styles.allCompTitle}>All Composers</h1>
        <div className={styles.allCompBody}>
          <div className={styles.allComposersHeader}>
            <Button darkModeEnabled={props.darkModeEnabled} buttonType="Shuffle" buttonText="Random Composer" buttonAction={randomComposer} />
            {filteredResultsCount === 0 ? <div className={styles.noResults}>No Results Found</div> : null}
            <FilterItems filterItems={filterComposers} placeholderText={"Search composers here..."} darkModeEnabled={props.darkModeEnabled} />
          </div>
          {Object.entries(shownResults).map(([letter, composers]) => (
            <LetterSection key={letter} letterHeaderCount={Object.keys(shownResults).length} composerArray={composers} letter={letter} darkModeEnabled={props.darkModeEnabled} />
          ))}
        </div>
      </div>}
    </div>
  );
}

export default AllComposers;
