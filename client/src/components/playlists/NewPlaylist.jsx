import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/playlists.module.css";
import AddWorkToPlaylist from "./AddWorkToPlaylist";
import toast from 'react-hot-toast';

function NewPlaylist() {

    // TODO MAKE INITIAL STATE DYNAMIC:
    // increment number only based on other playlists with the same name
    const [playlistName, setPlaylistName] = useState("Playlist 1");
    const [worksToAdd, setWorksToAdd] = useState([null]);

    const [allWorks, setAllWorks] = useState([]);
    // grab all works
    useEffect(() => {
        axios.get("http://localhost:3001/allWorks")
            .then(res => {
                setAllWorks(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    function updateName(event) {
        setPlaylistName(event.target.value)
    }

    function addWork(work) {
        if (work === null) { // add null for empty field
            if (worksToAdd[worksToAdd.length - 1] === null) {
                toast.error("Select a work before adding another one.")
                setWorksToAdd(prev => prev);
            }
            else { // all is well. Add work
                setWorksToAdd(prev => [...prev, work]);
            }
        }
        else {
            setWorksToAdd(prev => {
                prev[prev.length - 1] = work.workID; // replace last null
                return prev
            });
        }
    }

    return (
        <div className={styles.newPlaylistBody}>
            <h1 className={styles.title}>New Playlist</h1>
            <form className={styles.newPlaylistForm}>
                <div className={styles.newPlaylistNameParent}>
                    <label>Name</label>
                    <input onInput={updateName} className={styles.newPlaylistName} value={playlistName} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                </div>

                <div className={styles.searchForWorkParent}>
                    <label>Works</label>
                    {worksToAdd.map((workID, index) => {
                        // pass worksToAdd to disable already selected choices
                        return <AddWorkToPlaylist worksToAdd={worksToAdd} setWorksToAdd={setWorksToAdd} key={index} first={index === 0} workID={workID} allWorks={allWorks} addWork={addWork} />
                    })}
                </div>

                <div onClick={() => addWork(null)} className={styles.addWork}>+ Add another work</div>
            </form>
        </div>
    )
}

export default NewPlaylist; 