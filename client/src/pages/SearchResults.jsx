import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/searchResults/Card";
import Loading from "../components/Loading";
import "../css/searchResult.css";
import "../css/loading.css";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  // receive data from Home.jsx
  const query = location.state ? location.state.searchTerm : "";
  const [results, setResults] = useState([]);

  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    axios
      .post(`http://localhost:3001/search?q=${query}`)
      .then(function (res) {
        setResults(res.data.searchResult);
        setShowLoading(false);
      })
      .catch(function (err) {
        console.log(err.response.data.searchResult);
        navigate("/", { state: { error: true, errorMsg: err.response.data.searchResult } });
      });
  }, [query, navigate]);

  function goToComp(compID) {
    navigate(`/viewComposer?id=${compID}`, { state: compID }); // navigate to /search with data
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

      {!showLoading && <div className="searchResultParent" style={fadeIn}>
        <div className="searchResultTitle">
          {query !== "all" ? (
            <span>
              Top results for <span className="query">{query}</span>
            </span>
          ) : (
            "All Composers"
          )}
        </div>
        <div className="searchResultBody">
          {results.map((composer) => {
            return <Card key={composer.id} compID={composer.id} compPortrait={composer.portrait} compName={composer.name} goToComp={goToComp} />;
          })}
        </div>
      </div>}
    </div>
  );
}

export default SearchResults;
