import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import "../css/viewWorks.css"
import axios from "axios";
import WorkHeader from "../components/viewWorks/WorkHeader";
import WorkCard from "../components/viewWorks/WorkCard";
import FilterWorks from "../components/viewWorks/FilterWorks";

function ViewWorks() {

    const location = useLocation();
    const { id, genre } = location.state;
    const [pageLoaded, setPageLoaded] = useState(false);
    const [allWorks, setAllWorks] = useState([])        // "immutable" works array
    const [shownWorks, setShownWorks] = useState([])    // these change based on the search bar. These are the works that are shown
    const [composer, setComposer] = useState("")
    

    useEffect(() => {
        axios.get(`http://localhost:3001/viewWorks?id=${id}&genre=${genre}`)
            .then(function (res) {
                console.log(res.data)
                setAllWorks(res.data.works);
                setShownWorks(res.data.works);
                setComposer(res.data.composer);
                setPageLoaded(true);
            }).catch(function (err) {
                console.log(err);
            })

    }, [id, genre])

    function filterWorks(filter) {

        if (!filter) {  // show all
            setShownWorks(allWorks)
        }

        else { // filter works based on input
            let filteredWorks = allWorks.filter((work) => {
                function matchQueryToTitle(title, query) {
                    // create modified titles to relax constraint on matching query to title
                    title = title.toLocaleLowerCase();
                    let modifiedTitleA = title.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', '').replace("in ", "") // as basic as possible
                    let modifiedTitleB = title.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', '') // keep 'in'
                    let modifiedTitleC = title.replace("no. ", "number ").replace("op. ", "opus ") // lengthened abbreviations.
                    let modifiedTitleD = title.replace("no. ", "no ").replace("op. ", "op ") // alternate abbreviations.
                    return title.includes(query) || modifiedTitleA.includes(query) || modifiedTitleB.includes(query) || modifiedTitleC.includes(query) || modifiedTitleD.includes(query)
                }
                return matchQueryToTitle(work.title, filter.toLocaleLowerCase())
            })
            setShownWorks(filteredWorks)
        }
    }

    function sortWorks() {
        console.log("sorting!")
    }

    if (!pageLoaded) return <Loading />

    return (
        <div className="worksBody">
            <div className="workTitle">{genre} works by <span style={{ color: "brown" }}>{composer}</span></div>
            <FilterWorks filterWorks={filterWorks}/>
            <WorkHeader sort={sortWorks} />
            {shownWorks.map((work, index) => {
                return <WorkCard key={index} title={work.title} genre={work.genre} />
            })}

        </div>
    )
}

export default ViewWorks;