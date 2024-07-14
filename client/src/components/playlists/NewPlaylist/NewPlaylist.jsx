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

    const [playlistName, setPlaylistName] = useState("New playlist");
    function updateName(event) {
        setPlaylistName(event.target.value)
    }

    const [worksToAdd, setWorksToAdd] = useState([]);
    function addWork(work) {
        setWorksToAdd(prev => {
            return [...prev, work]
        })
    }

    // grab all works
    const [allWorks, setAllWorks] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        if (!props.sessionData) {
            navigate("/signIn");
        }
        else {
            axios.get("http://localhost:3001/api/allWorksNewPlaylist").then(res => {
                setAllWorks(res.data);
                setShowLoading(false);
            }).catch(err => {
                setShowLoading(false);
                console.log(err);
            })
        }
    }, [])

    function removeWork(workObj) {
        const updatedWorksToAdd = worksToAdd.filter(work => work.workID !== workObj.workID);
        setWorksToAdd(updatedWorksToAdd);
    }

    const navigate = useNavigate()

    async function createNewPlaylist(event) {
        console.log("executed")
        event.preventDefault();

        // check before making any requests
        if (playlistName === "") {
            toast.error("Enter a playlist name.")
            return;
        }
        else if (worksToAdd.length < 1) {
            toast.error("You must add at least 1 song.");
            return;
        }

        try {
            // make request to see if playlist name already exists
            const checkResponse = await axios.post("http://localhost:3001/api/checkPlaylistRecord", {
                userID: props.sessionData.user.id,
                newPlaylistName: playlistName,
            })

            if (checkResponse.data.success === false) {
                toast.error(`Playlist with name ${playlistName} already exists`);
            }
            else {
                await axios.post("http://localhost:3001/api/createPlaylist", {
                    userID: props.sessionData.user.id,
                    playlistName: playlistName,
                    playlistData: worksToAdd
                })
                toast.success("Playlist created");
                navigate("/profile/playlists");
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    function goBack() {
        navigate("/profile/playlists/")
    }

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    const contentStyling = classNames({
        [styles.newPlaylistParent]: true,
        [styles.applyFadeIn]: !showLoading,
    });

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        height: "94.5vh"
    }
    const inputDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        borderBottom: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={darkMode}>
            <div className={loadingStyling}>
                <Loading loadingText={"Grabbing all the data..."} darkModeEnabled={props.darkModeEnabled} />
            </div>

            {!showLoading && <div className={contentStyling}>
                <div className={styles.newPlaylistBody}>
                    <h1 className={styles.title}>New Playlist</h1>

                    <form onSubmit={createNewPlaylist} className={styles.newPlaylistForm}>
                        <div className={styles.newPlaylistNameParent}>
                            <label>Name</label>
                            <input onInput={updateName} className={styles.newPlaylistName} style={inputDarkMode} value={playlistName} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                        </div>

                        <div className={styles.searchForWorkParent}>
                            <label>Works</label>
                            {worksToAdd.map((work, index) => {
                                return <AddedWork work={work} removeWork={removeWork} key={index} darkModeEnabled={props.darkModeEnabled} />
                            })}
                            <AddWorkToPlaylist addWork={addWork} allWorks={allWorks} worksToAdd={worksToAdd} darkModeEnabled={props.darkModeEnabled} />
                        </div>

                        <div className={styles.buttonsParent}>
                            <button type="submit" className={styles.createButton}>Create</button>
                            <button onClick={goBack} className={styles.cancelButton}>Cancel</button>
                        </div>

                    </form>
                </div>
            </div>}
        </div>

    )
}

export default NewPlaylist; 