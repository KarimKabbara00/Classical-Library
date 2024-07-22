import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import WorkHeader from "../components/viewWorks/WorkHeader";
import WorkCard from "../components/viewWorks/WorkCard";
import FilterItems from "../components/shared/FilterItems";
import Loading from "../components/shared/Loading";
import styles from "../css/viewWorks.module.css";
import loadingStyles from "../css/loading.module.css";
import sharedStyles from "../css/shared.module.css";
import BackToTop from "../components/shared/BackToTop";
import GenreButton from "../components/viewWorks/GenreButton";
import Error from "../components/shared/Error";
import matchQueryToTitle from "../components/shared/helperFunctions";

function ViewWorks(props) {
  const location = useLocation();
  var compID;
  var genre;
  try {
    compID = location.state.id;
    genre = location.state.genre;
  }
  catch {
    void (0);
  }

  const [allWorks, setAllWorks] = useState([]); // "immutable" works array
  const [shownWorks, setShownWorks] = useState([]); // these change based on the filter bar. These are the works that are shown
  const [composer, setComposer] = useState("");
  const [portrait, setPortrait] = useState("");

  // genre states
  const [allGenres, setAllGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("");

  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    try {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })

      // if coming directly to this page, grab the ID from the url
      compID = !compID ? window.location.href.split("id=")[1].split("&")[0] : compID;
      genre = !genre ? window.location.href.split("genre=")[1].split("&")[0] : genre

      axios
        .get(`http://localhost:3001/api/viewWorks?id=${compID}&genre=${genre}`)
        .then(function (res) {
          setAllWorks(res.data.works);
          setShownWorks(filterWorksByGenre(res.data.works, genre));
          setComposer(res.data.composer);
          setPortrait(res.data.portrait);

          // genre states
          setCurrentGenre(genre);
          setAllGenres(res.data.allGenres);
          setShowLoading(false);
        })
        .catch(function (err) {
          console.log(err);
          setShowLoading(false);
          setShowError(true);
        });
    }
    catch (err) {
      console.log(err);
      setShowLoading(false);
      setShowError(true);
    }
  }, [compID, genre]);

  // for the buttons next to the filter input bar
  function filterWorksByGenre(works, genre) {
    var filteredWorks = works.filter(work => {
      if (genre === "Popular") {
        return work.popular === "1";
      }
      else if (genre === "Recommended") {
        return work.recommended === "1";
      }
      else {
        return work.genre === genre;
      }
    });
    return filteredWorks;
  }

  function onGenreButtonClick(genre) {
    setShownWorks(filterWorksByGenre(allWorks, genre));
    setCurrentGenre(genre);
    // update the URL &genre=
    let newUrl = window.location.href.split("&")[0] + `&genre=${genre}`
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  // filter input bar
  function filterWorks(filter) {
    if (!filter) {
      // show all
      setShownWorks(allWorks);
    } else {
      // filter works based on input
      let filteredWorks = allWorks.filter((work) => {
        // create modified titles to relax constraint on matching query to title
        return matchQueryToTitle(work.title, filter.toLocaleLowerCase());
      });
      setShownWorks(filteredWorks);
    }
  }

  function sortWorks(column, ascending = false) {
    ascending = ascending ? -1 : 1;
    const sortedWorks = [...shownWorks].sort(function (a, b) { // [...shownWorks] creates a copy so react can rerender
      if (column === "duration") {
        // convert hh:mm:ss to ms then sort
        let a_split = a[column].split(":");
        let b_split = b[column].split(":");
        let a_ms = ((parseInt(a_split[0]) * 3600) + (parseInt(a_split[1]) * 60) + (parseInt(a_split[2]))) * 1000;
        let b_ms = ((parseInt(b_split[0]) * 3600) + (parseInt(b_split[1]) * 60) + (parseInt(b_split[2]))) * 1000;
        console.log(a_ms, b_ms);
        return ascending * b_ms - a_ms;
      }
      else {
        return ascending * a[column].localeCompare(b[column]);
      }

    })
    setShownWorks(sortedWorks);
  }

  // slide up or down loading
  const loadingStyling = classNames({
    [loadingStyles.loadingParent]: true,
    [loadingStyles.applySlideDown]: showLoading,
    [loadingStyles.applySlideUp]: !showLoading,
  });

  const contentStyling = classNames({
    [styles.worksBody]: true,
    [styles.applyFadeIn]: !showLoading,
  });

  // -------------------- Dark Mode -------------------- //
  const LoadingDarkMode = {
    height: "94.5vh",
    backgroundColor: props.darkModeEnabled ? "#242728" : "",
  }
  const textDarkMode = {
    color: props.darkModeEnabled ? "#e8e6e3" : ""
  }
  // -------------------- Dark Mode -------------------- //

  return (
    <div id="worksBody" className={styles.worksMainBody} style={LoadingDarkMode}>
      <div className={loadingStyling}>
        <Loading loadingText={"Grabbing all works..."} darkModeEnabled={props.darkModeEnabled} />
      </div>

      <div className={sharedStyles.errorParent}>
        <Error showError={showError} darkModeEnabled={props.darkModeEnabled} />
      </div>

      {!showLoading && !showError && <div className={contentStyling}>
        <BackToTop elementId={"worksBody"} triggerAtY={300} />
        <div className={styles.workTitle} style={textDarkMode}>
          {currentGenre} works by <span style={{ color: "brown" }}>&nbsp;{composer}</span>
        </div>

        <div className={styles.filterWorksHeader}>
          <div className={styles.allGenresParent}>
            {allGenres.map((genre, index) => {
              return <GenreButton key={index} name={genre} currentGenre={currentGenre} onGenreButtonClick={onGenreButtonClick} darkModeEnabled={props.darkModeEnabled} />
            })}
          </div>
          <FilterItems filterItems={filterWorks} placeholderText={"Filter works here..."} darkModeEnabled={props.darkModeEnabled} />
        </div>

        <WorkHeader currentGenre={currentGenre} sortWorks={sortWorks} darkModeEnabled={props.darkModeEnabled} />
        {shownWorks.map((work) => {
          return (
            <WorkCard
              key={work.title} // intentionally not index
              title={work.title}
              genre={work.genre}
              duration={work.duration}
              url={work.url}
              composer={composer}
              darkModeEnabled={props.darkModeEnabled}
              fetchAudio={props.fetchAudio}
              audioObject={props.audioObject}
              setAnotherRequest={props.setAnotherRequest}
            />
          );
        })}
      </div>}
    </div>
  );
}

export default ViewWorks;
