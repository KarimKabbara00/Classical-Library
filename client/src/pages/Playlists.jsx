import React, { useEffect, useState } from "react";
import styles from "../css/playlists.module.css";
import { useNavigate } from "react-router-dom"

function Playlists() {

    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        //grab playlist for that user
    }, [])

    function newPlaylist() {
        navigate("/profile/playlists/newPlaylist");
    }

    return (
        <div className={styles.playlistBody}>
            <h1 className={styles.title}>Playlists</h1>
            <div className={styles.playlistContent}>
                <div className={styles.playlists}></div>
                {playlists.length === 0 && <div className={styles.noPlaylists}>
                    <span>You have no playlists.</span>
                    <div onClick={newPlaylist} className={styles.createPlaylist}>
                        + Create playlist
                    </div>
                </div>}
                {playlists.map((playlist, index) => {
                    return <div key={index}>{playlist}</div>
                })}
            </div>
        </div>
    )
}

export default Playlists;