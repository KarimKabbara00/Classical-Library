import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/playlists.module.css";
import AddWorkToPlaylist from "./AddWorkToPlaylist";

function NewPlaylist() {

    // TODO MAKE INITIAL STATE DYNAMIC:
    // increment number only based on other playlists with the same name
    const [playlistName, setPlaylistName] = useState("Playlist 1");
    const [worksToAddIndex, setWorksToAddIndex] = useState(0);
    const [worksToAdd, setWorksToAdd] = useState([{ index: 0, workID: null }]);
    // grab all works
    useEffect(() => {
        axios.get("http://localhost:3001/allWorks")
            .then(res => {

            }).catch(err => {

            })
    }, [])

    function updateName(event) {
        setPlaylistName(event.target.value)
    }

    function addAnotherWork() {
        // if(allValid)
        setWorksToAddIndex(prev => prev + 1);
        setWorksToAdd(prev => [...prev, { index: worksToAddIndex + 1, workID: null }])
        // else
        // do nothing and toast error
    }

    function destroyItem(index) {
        console.log(index)
        setWorksToAdd(prev => {

            // TODO DELETE ITEM THAT IS CLICKED ON 
  
            return;
        })
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
                    {worksToAdd.map((work, index) => {
                        return <AddWorkToPlaylist key={index} index={work.index} workID={work.workID} destroyItem={destroyItem} />
                    })}
                </div>

                <div onClick={addAnotherWork} className={styles.addWork}>+ Add another work</div>
            </form>
        </div>
    )
}

export default NewPlaylist; 