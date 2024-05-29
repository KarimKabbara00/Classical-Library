import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/viewComposer.css";
import axios from "axios";
import ComposerImage from "../components/viewComposer/ComposerImage";
import ComposerDescription from "../components/viewComposer/ComposerDescription";
import ComposerName from "../components/viewComposer/ComposerName";
import ComposerFacts from "../components/viewComposer/ComposerFacts";
import ExploreWorks from "../components/viewComposer/ExploreWorks";
import Timeline from "../components/viewComposer/Timeline";
import Loading from "../components/Loading";

function ViewComposer() {

    const location = useLocation();
    var compID = location.state;
    const [allData, setAllData] = useState({})
    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        compID = !compID ? window.location.href.split("id=")[1] : compID; // if coming directly to this page, grab the ID from the url
        axios.get(`http://localhost:3001/viewComposer?id=${compID}`)
            .then(function (res) {
                console.log(res.data)
                setAllData({
                    composerData: res.data.composerData,
                    genreData: res.data.genreData,
                    description: res.data.description,
                    born: res.data.born,
                    died: res.data.died,
                    timeline: res.data.timeline,
                });
                setPageLoaded(true);
            }).catch(function (err) {
                console.log(err);
            })
    }, [])

    const navigate = useNavigate()
    function viewWorksByGenre(genre) {
        navigate(`../viewWorks?id=${allData.composerData.id}&genre=${genre}`, { state: { id: allData.composerData.id, genre: genre } })
    }

    if (!pageLoaded) return <Loading />

    return (
        <div className="viewComposerMainBody">

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
        </div>
    )
}

export default ViewComposer;