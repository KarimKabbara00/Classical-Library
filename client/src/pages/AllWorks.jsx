import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import Loading from "../components/shared/Loading";
import loadingStyles from "../css/loading.module.css";
import BackToTop from "../components/shared/BackToTop";
import styles from "../css/allWorks.module.css";
import sharedStyles from "../css/shared.module.css";
import Error from "../components/shared/Error";
import Search from "../components/allWorks/Search";
import WorkItem from "../components/allWorks/WorkItem";
import matchQueryToTitle from "../components/shared/helperFunctions";
const baseURL = process.env.REACT_APP_BASE_URL;

function AllWorks(props) {

    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [allWorks, setAllWorks] = useState(false);
    useEffect(() => {
        axios.get(`${baseURL}/api/allWorks`).then(res => {
            setAllWorks(res.data);
            setShowLoading(false);
        }).catch(err => {
            console.log(err);
            setShowError(true);
        })
    }, []);

    const [shownWorks, setShownWorks] = useState([]);
    function indexGiganticString(inputText) {
        let splitAllWorks = allWorks.split("^__^");
        let shownWorksObject = []; // works to show
        for (let i in splitAllWorks) {
            if (matchQueryToTitle(splitAllWorks[i], inputText.toLocaleLowerCase())) {
                let splitDeburred = splitAllWorks[i].split("$$")
                shownWorksObject.push({
                    workID: splitDeburred[0],
                    workTitle: splitDeburred[1],
                    complete_name: splitDeburred[2],
                    portrait: splitDeburred[3]
                })
            }
        }
        setShownWorks(shownWorksObject);
    }

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    const contentStyling = classNames({
        [styles.allWorksParent]: true,
        [styles.applyFadeIn]: !showLoading,
    });

    // -------------------- Dark Mode -------------------- //
    const allWorksMainBodyDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div id="allWorksMainBody" className={styles.allWorksMainBody} style={allWorksMainBodyDarkMode}>
            <div className={loadingStyling}>
                <Loading loadingText={"Grabbing all works..."} darkModeEnabled={props.darkModeEnabled} />
            </div>

            <div className={sharedStyles.errorParent}>
                <Error showError={showError} darkModeEnabled={props.darkModeEnabled} />
            </div>

            {!showLoading && !showError && <div className={contentStyling} >
                <BackToTop elementId={"allWorksMainBody"} triggerAtY={300} />
                <h1 className={styles.allWorksTitle}>All Works</h1>

                <Search allWorks={allWorks} setShownWorks={setShownWorks} indexGiganticString={indexGiganticString} darkModeEnabled={props.darkModeEnabled} />

                <div className={styles.allWorksBody}>
                    <div className={styles.searchResult}>
                        {shownWorks.map((work, index) => {
                            return (
                                <WorkItem
                                    key={index}
                                    workTitle={work.workTitle}
                                    completeName={work.complete_name}
                                    workID={work.workID}
                                    work={work}
                                    darkModeEnabled={props.darkModeEnabled}
                                    fetchAudio={props.fetchAudio}
                                    audioObject={props.audioObject}
                                    setAnotherRequest={props.setAnotherRequest}
                                />
                            )
                        })}
                    </div>
                </div>

            </div>}
        </div >
    );
}

export default AllWorks;