import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddWorkToPlaylist from "./AddWorkToPlaylist";
import AddedWork from "./AddedWork";
import toast from 'react-hot-toast';
import Loading from "../../shared/Loading";
import styles from "../../../css/playlists.module.css";
import loadingStyles from "../../../css/loading.module.css";
import classNames from "classnames";

function NewPlaylist(props) {

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
            return [...prev, work]
        })
    }

    function removeWork(workObj) {
        const updatedWorksToAdd = worksToAdd.filter(work => work.workID !== workObj.workID);
        setWorksToAdd(updatedWorksToAdd);
    }

    const navigate = useNavigate()
    function createNewPlaylist(event) {
        event.preventDefault();

        if (playlistName === "") {
            toast.error("Enter a playlist name.")
            return;
        }
        else if (worksToAdd.length < 1) {
            toast.error("You must add at least 1 song.");
            return;
        }

        axios.post("http://localhost:3001/api/createPlaylist", {
            userID: props.sessionData.user.id,
            playlistName: playlistName,
            playlistData: worksToAdd
        }).then(res => {
            toast.success("Playlist created");
            navigate("/profile/playlists");
        }).catch(err => {
            console.log(err)
        })
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
                            return <AddedWork work={work} removeWork={removeWork} key={index} />
                        })}
                        <AddWorkToPlaylist addWork={addWork} allWorks={allWorks} worksToAdd={worksToAdd} />
                    </div>

                    <div onClick={createNewPlaylist} className={styles.addNewPlaylistButton}>Create Playlist</div>
                </form>
            </div>}
        </div>
    )
}

export default NewPlaylist; 