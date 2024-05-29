import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/home/SearchBar"
import Loading from "../components/Loading"
import Button from "../components/home/Button"
import QueryError from "../components/home/QueryError";
import composerList from "../composerList"
import MusicPlayer from "../components/musicPlayer/MusicPlayer";


function Home(props) { 

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    // Receive from SearchBar
    function onQuery(searchTerm) {
        props.setLoading(true);
        axios.post(`http://localhost:3001/search?q=${searchTerm}`)
            .then(function (res) {
                props.setLoading(false);                                    // unrender loading animation
                navigate(`/search?q=${searchTerm}`, { state: res.data })    // navigate to /search with data
            }).catch(function (err) {
                console.log(err.response.data.searchResult)
                setError(true);
                setErrorMsg(err.response.data.searchResult);
                props.setLoading(false);                                    // TODO: render something here?
            })
    }

    function randomComposer() {
        let random = Math.floor(Math.random() * composerList.length);
        let compID = composerList[random].id;
        navigate(`/viewComposer?id=${compID}`)
    }

    if (props.loading) return <Loading />

    return (
        <div className="searchAndButtons">
            <MusicPlayer />
            <SearchBar onQuery={onQuery} error={error} />
            <div className="buttonParent">
                <Button buttonType="Shuffle" buttonText="Shuffle Composers" buttonAction={randomComposer} />
                <Button buttonType="All" buttonText="View All Composers" buttonAction={onQuery} />
            </div>
            {error && <QueryError errorMessage={errorMsg} />}
        </div>
    )
}

export default Home;