import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom"
import styles from "../css/playlists.module.css";
import PlaylistItem from "../components/playlists/Playlists/PlaylistItem";
import Loading from "../components/shared/Loading";
import loadingStyles from "../css/loading.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import { refreshSession } from "../sessionHandler";
const baseURL = process.env.REACT_APP_BASE_URL;

function Playlists(props) {

    const navigate = useNavigate();
    const [state, forceUpdate] = useReducer(x => x + 1, 0); // increment state when a playlist is delete
    const [ready, setReady] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        // check if the access token is valid
        const checkToken = async () => {
            if (!Cookies.get("accessToken") && !props.wasSignedIn) {
                navigate("/signIn");
                return;
            }
            else if (!Cookies.get("accessToken") && props.wasSignedIn) {
                // needs to be async
                await refreshSession(props.accessToken, props.refreshToken, props.setAccessToken, props.setRefreshToken);
                setReady(true);
            }
            else {
                setReady(true); // token hasn't expired
            }
        }
        checkToken();
    }, [])

    useEffect(() => {

        // when access token is checked, fetch playlist
        if (!ready)
            return;

        setShowLoading(true); // when state change is forced, show loading
        axios.get(`${baseURL}/api/viewPlaylists`, {
            headers: {
                accessToken: `Bearer ${props.accessToken}`,
            }
        }).then(res => {
            setPlaylists(res.data)
            setShowLoading(false);
        }).catch(err => {
            console.log(err);
            setShowLoading(false);
        });
    }, [state, ready])

    function newPlaylist() {
        navigate("/profile/playlists/newPlaylist");
    }

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    const contentStyling = classNames({
        [styles.playlistBody]: true,
        [styles.applyFadeIn]: !showLoading,
    });

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={darkMode} className={styles.playlistParent}>
            <div className={loadingStyling}>
                <Loading loadingText={"Grabbing your playlists..."} darkModeEnabled={props.darkModeEnabled} />
            </div>
            {!showLoading && <div className={contentStyling}>
                <h1 className={styles.title}>Playlists</h1>
                <div className={styles.playlistContent}>
                    <div className={styles.playlists}>
                        {playlists.length !== 0 && playlists.map((playlist, index) => {
                            return <PlaylistItem
                                accessToken={props.accessToken}
                                key={index}
                                playlist={playlist}
                                forceUpdate={forceUpdate}
                                darkModeEnabled={props.darkModeEnabled}
                                fetchAudio={props.fetchAudio}
                                audioObject={props.audioObject}
                                setAnotherRequest={props.setAnotherRequest}
                            />
                        })}
                        {playlists.length !== 0 &&
                            <div style={{ marginTop: "0.5rem", alignSelf: "flex-start" }} onClick={newPlaylist} className={styles.createPlaylist}>
                                <FontAwesomeIcon icon={faPlus} color={props.darkModeEnabled ? "#e8e6e3" : "white"} fontSize="15px" />
                                <span>Create playlist</span>
                            </div>
                        }
                    </div>
                </div>
                {playlists.length === 0 && <div className={styles.noPlaylists}>
                    <span>You have no playlists.</span>
                    <div onClick={newPlaylist} className={styles.createPlaylist}>Create playlist</div>
                </div>}
            </div>}
        </div>

    )
}

export default Playlists;