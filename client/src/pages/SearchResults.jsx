import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import FilterItems from "../components/shared/FilterItems";
import Card from "../components/searchResults/Card";
import Loading from "../components/Loading";
import styles from "../css/searchResult.module.css";
import loadingStyles from "../css/loading.module.css";
// import LetterHeader from "../components/searchResults/LetterHeader";

// function sortWorks(works) {

//   // sort alphabetically by last name
//   works = works.sort((a, b) => a.name.split(" ").pop(0).charAt(0) > b.name.split(" ").pop(0).charAt(0))

//   let alphabetObject = {
//     // "A": [],
//     "B": [],
//     "C": [],
//     "D": [],
//     "E": [],
//     "F": [],
//     "G": [],
//     "H": [],
//     "I": [],
//     "J": [],
//     "K": [],
//     "L": [],
//     "M": [],
//     "N": [],
//     "O": [],
//     "P": [],
//     "Q": [],
//     "R": [],
//     "S": [],
//     "T": [],
//     "U": [],
//     "V": [],
//     "W": [],
//     "X": [],
//     "Y": [],
//     "Z": []
//   };

//   // place composers into alphabet object my last name initial
//   for (let i of works) {
//     // get last name inital
//     let lastNameInitial = i.name.split(" ").pop(0).charAt(0).toLocaleUpperCase();
//     // if last initial not in object, add it
//     if (!(lastNameInitial in alphabetObject)) {
//       alphabetObject[lastNameInitial] = [];
//     }
//     // place it 
//     alphabetObject[lastNameInitial].push(i);
//   }
//   return alphabetObject;
// }

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  // receive data from Home.jsx
  const query = location.state ? location.state.searchTerm : "";
  const [allResults, setAllResults] = useState([]);
  const [shownResults, setShownResults] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    axios
      .post(`http://localhost:3001/search?q=${query}`)
      .then(function (res) {
        // sort alphabetically by last name
        let sortedResults = res.data.searchResult.sort((a, b) => a.name.split(" ").pop(0).charAt(0) > b.name.split(" ").pop(0).charAt(0));
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

  function goToComp(compID) {
    navigate(`/viewComposer?id=${compID}`, { state: compID }); // navigate to /search with data
  }

  function filterComposers(filter) {
    if (!filter) {
      // show all
      setShownResults(allResults);
    } else {
      // filter works based on input
      let filteredResults = allResults.filter((result) => {
        function matchQueryToTitle(name, query) {
          // create modified titles to relax constraint on matching query to name
          name = name.toLocaleLowerCase();
          let modifiedTitleA = name.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', "").replace("in ", ""); // as basic as possible
          let modifiedTitleB = name.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', ""); // keep 'in'
          let modifiedTitleC = name.replace("no. ", "number ").replace("op. ", "opus "); // lengthened abbreviations.
          let modifiedTitleD = name.replace("no. ", "no ").replace("op. ", "op "); // alternate abbreviations.
          return name.includes(query) || modifiedTitleA.includes(query) || modifiedTitleB.includes(query) || modifiedTitleC.includes(query) || modifiedTitleD.includes(query);
        }
        return matchQueryToTitle(result.name, filter.toLocaleLowerCase());
      });
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
        <div className={styles.searchResultTitle}>
          {query !== "all" ? (
            <span>
              Top results for <span className={styles.query}>{query}</span>
            </span>
          ) : (
            "All Composers"
          )}
        </div>
        <div className={styles.searchResultBody}>
          <FilterItems filterItems={filterComposers} />
          <div className={styles.searchResultGrid}>
            {shownResults.length === 0 ? (
              <div className={styles.noResults}>No Results Found</div>
            ) : (
              shownResults.map((composer) => (
                <Card key={composer.id} compID={composer.id} compPortrait={composer.portrait} compName={composer.name} goToComp={goToComp} />
              ))
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}

export default SearchResults;
