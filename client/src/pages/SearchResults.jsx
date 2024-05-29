import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/searchResults/Card";
import Loading from "../components/Loading"
import "../css/searchResult.css"

function SearchResults(props) {

    // receive data from Home.jsx
    const location = useLocation()
    const query = location.state ? location.state.query : "";
    const results = location.state ? location.state.searchResult : [];

    const navigate = useNavigate();
    function goToComp(compID) {
        navigate(`/viewComposer?id=${compID}`, { state: compID })    // navigate to /search with data
    }

    if (props.loading) return <Loading />

    return (
        <div>
            <div className="searchResultTitle">
                {query ? (<span>Top results for <span className="query">{query}</span></span>) : ("All Composers")}
            </div>

            <div className="searchResultBody">
                {results.map((composer) => {
                    return <Card key={composer.id} compID={composer.id} compPortrait={composer.portrait} compName={composer.name} goToComp={goToComp} />
                })}
            </div>
        </div>
    )
}


export default SearchResults