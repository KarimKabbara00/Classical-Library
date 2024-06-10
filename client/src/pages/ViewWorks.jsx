import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import WorkHeader from "../components/viewWorks/WorkHeader";
import WorkCard from "../components/viewWorks/WorkCard";
import FilterWorks from "../components/shared/FilterWorks";
import Loading from "../components/Loading";
import styles from "../css/viewWorks.module.css";
import loadingStyles from "../css/loading.module.css";

function ViewWorks(props) {
  const location = useLocation();
  const { id, genre } = location.state;
  const [allWorks, setAllWorks] = useState([]); // "immutable" works array
  const [shownWorks, setShownWorks] = useState([]); // these change based on the search bar. These are the works that are shown
  const [composer, setComposer] = useState("");
  const [portrait, setPortrait] = useState("");

  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/viewWorks?id=${id}&genre=${genre}`)
      .then(function (res) {
        setAllWorks(res.data.works);
        setShownWorks(res.data.works);
        setComposer(res.data.composer);
        setPortrait(res.data.portrait);
        setShowLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id, genre]);

  function filterWorks(filter) {
    if (!filter) {
      // show all
      setShownWorks(allWorks);
    } else {
      // filter works based on input
      let filteredWorks = allWorks.filter((work) => {
        function matchQueryToTitle(title, query) {
          // create modified titles to relax constraint on matching query to title
          title = title.toLocaleLowerCase();
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

  function sortWorks(column, ascending) {
    ascending = ascending ? -1 : 1;
    const sortedWorks = [...shownWorks].sort(function (a, b) { // [...shownWorks] creates a copy so react can rerender
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

  return (
    <div className={styles.worksMainBody}>
      <div className={loadingStyling}>
        <Loading />
      </div>

      {!showLoading && <div className={contentStyling}>
        <div className={styles.workTitle}>
          {genre} works by <span style={{ color: "brown" }}>{composer}</span>
        </div>
        <FilterWorks filterWorks={filterWorks} />
        <WorkHeader sortWorks={sortWorks} />
        {shownWorks.map((work, index) => {
          return (
            <WorkCard
              key={index}
              title={work.title}
              genre={work.genre}
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
