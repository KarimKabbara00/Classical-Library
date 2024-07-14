import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import toast from 'react-hot-toast';
import WorkItem from "./WorkItem";
import styles from "../../../css/playlists.module.css";
import arrowRight from "../../../images/arrow-right.svg"
import arrowDown from "../../../images/arrow-down.svg"
import playBrown from "../../../images/playlists/play-brown.svg"
import playBlack from "../../../images/playlists/play-black.svg"
import editBrown from "../../../images/playlists/edit-brown.svg"
import editBlack from "../../../images/playlists/edit-black.svg"
import deleteBrown from "../../../images/playlists/delete-brown.svg"
import deleteBlack from "../../../images/playlists/delete-black.svg"
import playWhite from "../../../images/playlists/play-white.svg"
import editWhite from "../../../images/playlists/edit-white.svg"
import deleteWhite from "../../../images/playlists/delete-white.svg"
import Prompt from "../../shared/Prompt";

function PlaylistItem(props) {

    const [arrowClicked, setArrowClicked] = useState(false);
    const [arrowSVG, setArrowSVG] = useState(arrowRight);

    function onArrowClick() {
        setArrowClicked(prev => {
            !prev ? setArrowSVG(arrowDown) : setArrowSVG(arrowRight);
            return !prev;
        })
    }

    // ---------- Play ---------- //
    const [playSVG, setPlaySVG] = useState(playBlack);
    function onPlayHoverEvent(hovered) {
        props.darkModeEnabled ?
            hovered ? setPlaySVG(playBrown) : setPlaySVG(playWhite) :
            hovered ? setPlaySVG(playBrown) : setPlaySVG(playBlack);
    }

    // ---------- Edit ---------- //
    const [editSVG, setEditSVG] = useState(editBlack);
    function onEditHoverEvent(hovered) {
        props.darkModeEnabled ?
            hovered ? setEditSVG(editBrown) : setEditSVG(editWhite) :
            hovered ? setEditSVG(editBrown) : setEditSVG(editBlack);
    }

    const navigate = useNavigate();
    function editPlaylist() {
        axios.post("http://localhost:3001/api/fetchPlaylist", {
            userID: props.user_id,
            playlistName: props.playlist.playlistName
        }).then(res => {
            navigate("/profile/playlists/editPlaylist", { state: { playlistData: res.data } })
        }).catch(err => {
            console.log(err);
        })
    }

    // when dark mode changes, force event to change unhovered color
    useEffect(() => {
        onPlayHoverEvent(false);
        onEditHoverEvent(false);
        onDeleteHoverEvent(false);
    }, [props.darkModeEnabled])

    // ---------- Delete ---------- //
    const [deleteSVG, setDeleteSVG] = useState(deleteBlack);
    function onDeleteHoverEvent(hovered) {
        props.darkModeEnabled ?
            hovered ? setDeleteSVG(deleteBrown) : setDeleteSVG(deleteWhite) :
            hovered ? setDeleteSVG(deleteBrown) : setDeleteSVG(deleteBlack);
    }


    const [promptDelete, setPromptDelete] = useState(false);
    function deletePlaylist(confirmDelete) {

        setPromptDelete(false);
        if (confirmDelete === false)
            return

        axios.post("http://localhost:3001/api/deletePlaylist", {
            userID: props.user_id,
            playlistName: props.playlist.playlistName
        }).then(res => {
            toast.success("Playlist deleted");
            props.forceUpdate();
        }).catch(err => {
            console.log(err);
            toast.error("Error making request");
        })
    }

    // fade in on arrow down
    const showPlaylistAnim = useSpring({
        from: { opacity: arrowClicked ? "0" : "1" },
        to: { opacity: arrowClicked ? "1" : "0" },
        config: { tension: 300, friction: 30 }
    })

    return (
        <div>
            <div className={styles.playlistItem}>
                <div className={styles.playlistTitleParent}>
                    <div className={styles.playlistTitleAndArrow}>
                        <h2>{props.playlist.playlistName}</h2>
                        <img onClick={onArrowClick} className={styles.playlistTitleArrow} src={arrowSVG} width="25px" alt="arrowRightDownIcon" />
                    </div>
                    <div className={styles.playlistActionsParent}>
                        <img src={playSVG} onMouseEnter={() => onPlayHoverEvent(true)} onMouseLeave={() => onPlayHoverEvent(false)} width="20px" alt="playIcon" />
                        <img src={editSVG} onClick={editPlaylist} onMouseEnter={() => onEditHoverEvent(true)} onMouseLeave={() => onEditHoverEvent(false)} width="20px" alt="editIcon" />
                        <img src={deleteSVG} onClick={() => setPromptDelete(true)} onMouseEnter={() => onDeleteHoverEvent(true)} onMouseLeave={() => onDeleteHoverEvent(false)} width="20px" alt="deleteIcon" />
                    </div>
                </div>

                {arrowClicked && <animated.div style={showPlaylistAnim} className={styles.playlistWorksParent}>
                    {props.playlist.works.map((work, index) => {
                        return <WorkItem key={index} index={index + 1} title={work.title} compName={work.complete_name} />
                    })}
                </animated.div>}
            </div>

            {promptDelete && <Prompt
                title={`Delete '${props.playlist.playlistName}'?`}
                description="This action cannot be undone."
                confirm="Delete"
                cancel="Cancel"
                callback={deletePlaylist}
                darkModeEnabled={props.darkModeEnabled}
            />}

        </div>

    )
}

export default PlaylistItem;