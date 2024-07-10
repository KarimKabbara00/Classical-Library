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
import deburr from 'lodash/deburr';
import GenreButton from "../components/viewWorks/GenreButton";
import Error from "../components/shared/Error";

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
        function matchQueryToTitle(title, query) {
          // remove diactritcs and accents
          title = deburr(title).toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
          let modifiedTitleA = title.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', "").replace("in ", ""); // as basic as possible
          let modifiedTitleB = title.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', ""); // keep 'in'
          let modifiedTitleC = title.replace("no. ", "number ").replace("op. ", "opus "); // lengthened abbreviations.
          let modifiedTitleD = title.replace("no. ", "no ").replace("op. ", "op "); // alternate abbreviations.
          return title.includes(query) || modifiedTitleA.includes(query) || modifiedTitleB.includes(query) || modifiedTitleC.includes(query) || modifiedTitleD.includes(query);
        }
        return matchQueryToTitle(work.title, filter.toLocaleLowerCase());
      });
      setShownWorks(filteredWorks);
    }
  }

  function sortWorks(column, ascending = false) {
    ascending = ascending ? -1 : 1;
    const sortedWorks = [...shownWorks].sort(function (a, b) { // [...shownWorks] creates a copy so react can rerender
      if (column === "duration")
        return ascending * a[column] < (b[column]);
      else
        return ascending * a[column].localeCompare(b[column]);
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

  // screen height when loading or not
  const dynamicHeight = {
    minHeight: "90vh",
    height: showLoading ? "90vh" : ""
  };

  return (
    <div id="worksBody" className={styles.worksMainBody} style={dynamicHeight}>
      <div className={loadingStyling}>
        <Loading />
      </div>

      <div className={sharedStyles.errorParent}>
        <Error showError={showError} />
      </div>

      {!showLoading && !showError && <div className={contentStyling}>
        <BackToTop elementId={"worksBody"} />
        <div className={styles.workTitle}>
          {currentGenre} works by <span style={{ color: "brown" }}>&nbsp;{composer}</span>
        </div>

        <div className={styles.filterWorksHeader}>
          <div className={styles.allGenresParent}>
            {allGenres.map((genre, index) => {
              return <GenreButton key={index} name={genre} currentGenre={currentGenre} onGenreButtonClick={onGenreButtonClick} />
            })}
          </div>
          <FilterItems filterItems={filterWorks} placeholderText={"Filter works here..."} />
        </div>

        <WorkHeader currentGenre={currentGenre} sortWorks={sortWorks} />
        {shownWorks.map((work, index) => {
          return (
            <WorkCard
              key={index}
              title={work.title}
              genre={work.genre}
              duration={work.duration}
              url={work.url}
              composer={composer}
              portrait={portrait}
              showOrHideMusicPlayer={props.showOrHideMusicPlayer}
              currentSong={props.currentSong}
              setCurrentSong={props.setCurrentSong}
              audioObject={props.audioObject}
              setAudioObject={props.setAudioObject}
              animInOut={props.animInOut}
            />
          );
        })}
      </div>}
    </div>
  );
}

export default ViewWorks;
