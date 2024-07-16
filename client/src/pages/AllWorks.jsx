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

function AllWorks(props) {

    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [allWorks, setAllWorks] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3001/api/allWorks").then(res => {
            setAllWorks(res.data);
            console.log(res.data)
            setShowLoading(false);
        }).catch(err => {
            console.log(err);
            setShowError(true);
        })
    }, []);

    const [shownWorks, setShownWorks] = useState([]);

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

    return (
        <div id="allWorksMainBody" className={styles.allWorksMainBody}>
            <div className={loadingStyling}>
                <Loading loadingText={"Grabbing all works..."} darkModeEnabled={props.darkModeEnabled} />
            </div>

            <div className={sharedStyles.errorParent}>
                <Error showError={showError} darkModeEnabled={props.darkModeEnabled} />
            </div>

            {!showLoading && !showError && <div className={contentStyling} >
                <BackToTop elementId={"allWorksMainBody"} triggerAtY={300} />
                <h1 className={styles.allWorksTitle}>All Works</h1>

                <Search allWorks={allWorks} setShownWorks={setShownWorks} />

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
                                    audioObject={props.audioObject}
                                    setAudioObject={props.setAudioObject}
                                    currentSong={props.currentSong}
                                    setCurrentSong={props.setCurrentSong}
                                    showOrHideMusicPlayer={props.showOrHideMusicPlayer}
                                    darkModeEnabled={props.darkModeEnabled}
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