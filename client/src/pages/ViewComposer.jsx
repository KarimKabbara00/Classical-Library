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
import Loading from "../components/Loading";
import styles from "../css/viewComposer.module.css";
import loadingStyles from "../css/loading.module.css";

function ViewComposer() {
  const location = useLocation();
  const [allData, setAllData] = useState({});

  const [showLoading, setShowLoading] = useState(true);
  var compID = location.state;

  useEffect(() => {
    compID = !compID ? window.location.href.split("id=")[1] : compID; // if coming directly to this page, grab the ID from the url
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
        console.log("ERROR FETCHING COMPOSER")
        console.log(err);
      });
  }, [compID, window.location.href]);

  const navigate = useNavigate();
  function viewWorksByGenre(genre) {
    navigate(`../viewWorks?id=${allData.composerData.id}&genre=${genre}`, { state: { id: allData.composerData.id, genre: genre } });
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

  return (
    <div style={{ height: "100vh" }}>
      <div className={loadingStyling}>
        <Loading />
      </div>

      {!showLoading && <div className={contentStyling}>
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
