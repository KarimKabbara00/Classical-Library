import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/playlists.module.css";
import AddWorkToPlaylist from "./AddWorkToPlaylist";
import toast from 'react-hot-toast';
import Loading from "../../components/shared/Loading";
import loadingStyles from "../../css/loading.module.css";
import classNames from "classnames";
import AddedWork from "./AddedWork";

function NewPlaylist() {

    // grab all works
    const [allWorks, setAllWorks] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:3001/allWorks")
            .then(res => {
                setAllWorks(res.data);
                setShowLoading(false);
            }).catch(err => {
                setShowLoading(false);
                console.log(err);
            })
    }, [])

    // TODO MAKE INITIAL STATE DYNAMIC:
    // increment number only based on other playlists with the same name
    const [playlistName, setPlaylistName] = useState("Playlist 1");
    function updateName(event) {
        setPlaylistName(event.target.value)
    }

    const [worksToAdd, setWorksToAdd] = useState([]);
    function addWork(work) {
        setWorksToAdd(prev => {
            console.log([...prev, work])
            return [...prev, work]
        })
    }

    function removeWork(workObj) {
        const updatedWorksToAdd = worksToAdd.filter(work => work.workID !== workObj.workID);
        setWorksToAdd(updatedWorksToAdd);
    }

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    return (
        <div className={styles.newPlaylistParent}>
            <div className={loadingStyling}>
                <Loading />
            </div>

            {!showLoading && <div className={styles.newPlaylistBody}>
                <h1 className={styles.title}>New Playlist</h1>
                <form className={styles.newPlaylistForm}>
                    <div className={styles.newPlaylistNameParent}>
                        <label>Name</label>
                        <input onInput={updateName} className={styles.newPlaylistName} value={playlistName} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                    </div>

                    <div className={styles.searchForWorkParent}>
                        <label>Works</label>
                        {worksToAdd.map((work, index) => {
                            console.log(work);
                            return <AddedWork work={work} removeWork={removeWork} key={index} />
                        })}
                        <AddWorkToPlaylist addWork={addWork} allWorks={allWorks} worksToAdd={worksToAdd} />
                    </div>

                    <div className={styles.addNewPlaylistButton}>Create Playlist</div>
                </form>
            </div>}
        </div>
    )
}

export default NewPlaylist; 