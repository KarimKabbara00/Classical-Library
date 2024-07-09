import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import styles from "../css/playlists.module.css";
import PlaylistItem from "../components/playlists/Playlists/PlaylistItem";

function Playlists(props) {

    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:3001/api/viewPlaylists", {
            user_id: props.sessionData.user.id
        }).then(res => {
            setPlaylists(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
        //grab playlist for that user
    }, [])

    function newPlaylist() {
        navigate("/profile/playlists/newPlaylist", { state: { userID: props.sessionData.user.id } });
    }

    return (
        <div className={styles.playlistBody}>
            <h1 className={styles.title}>Playlists</h1>
            <div className={styles.playlistContent}>
                <div className={styles.playlists}>
                    {playlists.length !== 0 && playlists.map((playlist, index) => {
                        return <PlaylistItem key={index} playlist={playlist} />
                    })}
                </div>
                {playlists.length === 0 && <div className={styles.noPlaylists}>
                    <span>You have no playlists.</span>
                    <div onClick={newPlaylist} className={styles.createPlaylist}>
                        + Create playlist
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default Playlists;