import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import ComposerImage from "../components/viewComposer/ComposerImage";
import ComposerDescription from "../components/viewComposer/ComposerDescription";
import ComposerName from "../components/viewComposer/ComposerName";
import ComposerFacts from "../components/viewComposer/ComposerFacts";
import ExploreWorks from "../components/viewComposer/ExploreWorks";
import Timeline from "../components/viewComposer/Timeline";
import Loading from "../components/shared/Loading";
import Error from "../components/shared/Error";
import styles from "../css/viewComposer.module.css";
import sharedStyles from "../css/shared.module.css";
import loadingStyles from "../css/loading.module.css";

function ViewComposer() {
  const location = useLocation();
  const [allData, setAllData] = useState({});

  var compID = location.state;

  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })

      // if coming directly to this page, grab the ID from the url
      compID = !compID ? window.location.href.split("id=")[1] : compID;

      axios
        .get(`http://localhost:3001/viewComposer?id=${compID}`)
        .then(function (res) {
          setAllData({
            composerData: res.data.composerData,
            genreData: res.data.genreData,
            description: res.data.description,
            born: res.data.born,
            died: res.data.died,
            timeline: res.data.timeline,
          });
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
  }, [compID, window.location.href]);

  const navigate = useNavigate();
  function viewWorksByGenre(genre) {
    navigate(`../viewWorks?id=${allData.composerData.id}&genre=${genre}`, { state: { id: allData.composerData.id, allGenres: allData.genreData, genre: genre } });
  }

  // slide up or down loading
  const loadingStyling = classNames({
    [loadingStyles.loadingParent]: true,
    [loadingStyles.applySlideDown]: showLoading,
    [loadingStyles.applySlideUp]: !showLoading,
  });

  const contentStyling = classNames({
    [styles.viewComposerMainBody]: true,
    [styles.applyFadeIn]: !showLoading,
  });

  // screen height when loading or not
  const dynamicHeight = {
    minHeight: "90vh",
    height: showLoading ? "90vh" : ""
  };

  return (
    <div style={dynamicHeight}>
      <div className={loadingStyling}>
        <Loading />
      </div>

      <div className={sharedStyles.errorParent}>
        <Error showError={showError} />
      </div>

      {!showLoading && !showError && <div className={contentStyling}>
        <div className={styles.left}>
          <div className={styles.composerBody}>
            <div className={styles.composerHeader}>
              <ComposerName complete_name={allData.composerData.complete_name} />
              <ComposerFacts born={allData.born} died={allData.died} epoch={allData.composerData.epoch} />
            </div>
            <div className={styles.composerImageAndDescription}>
              <ComposerImage portrait={allData.composerData.portrait} />
              <ComposerDescription description={allData.description} />
            </div>
          </div>
          <ExploreWorks genres={allData.genreData} viewWorksByGenre={viewWorksByGenre} />
        </div>

        <div className={styles.right}>
          <Timeline events={allData.timeline} />
        </div>
      </div>}
    </div>
  );
}

export default ViewComposer;
