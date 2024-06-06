import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ComposerImage from "../components/viewComposer/ComposerImage";
import ComposerDescription from "../components/viewComposer/ComposerDescription";
import ComposerName from "../components/viewComposer/ComposerName";
import ComposerFacts from "../components/viewComposer/ComposerFacts";
import ExploreWorks from "../components/viewComposer/ExploreWorks";
import Timeline from "../components/viewComposer/Timeline";
import Loading from "../components/Loading";
import "../css/viewComposer.css";
import "../css/loading.css";

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

  // fade in content when done loading
  const fadeIn = !showLoading ? { animation: "fadeIn 500ms forwards 1" } : { animation: "none" };

  // slide up or down loading
  const upOrDown = showLoading ? { animation: "slideDown 300ms forwards 1" } : { animation: "slideUp 300ms forwards 1" };

  return (
    <div>
      <div style={upOrDown} className="loadingParent">
        <Loading />
      </div>

      {!showLoading && <div style={fadeIn} className="viewComposerMainBody">
        <div className="left">
          <div className="composerBody">
            <div className="composerHeader">
              <ComposerName complete_name={allData.composerData.complete_name} />
              <ComposerFacts born={allData.born} died={allData.died} epoch={allData.composerData.epoch} />
            </div>
            <div className="composerImageAndDescription">
              <ComposerImage portrait={allData.composerData.portrait} />
              <ComposerDescription description={allData.description} />
            </div>
          </div>
          <ExploreWorks genres={allData.genreData} viewWorksByGenre={viewWorksByGenre} />
        </div>

        <div className="right">
          <Timeline events={allData.timeline} />
        </div>
      </div>}
    </div>
  );
}

export default ViewComposer;
