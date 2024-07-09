import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
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

function PlaylistItem(props) {

    const [arrowClicked, setArrowClicked] = useState(false);
    const [arrowSVG, setArrowSVG] = useState(arrowRight);

    function onArrowClick() {
        setArrowClicked(prev => {
            !prev ? setArrowSVG(arrowDown) : setArrowSVG(arrowRight);
            return !prev;
        })
    }

    const [playSVG, setPlaySVG] = useState(playBlack);
    function onPlayAction(hovered) {
        hovered ? setPlaySVG(playBrown) : setPlaySVG(playBlack);
    }

    const [editSVG, setEditSVG] = useState(editBlack);
    function onEditAction(hovered) {
        hovered ? setEditSVG(editBrown) : setEditSVG(editBlack);
    }

    const [deleteSVG, setDeleteSVG] = useState(deleteBlack);
    function onDeleteAction(hovered) {
        hovered ? setDeleteSVG(deleteBrown) : setDeleteSVG(deleteBlack);
    }

    // fade in on arrow down
    const showPlaylistAnim = useSpring({
        from: { opacity: arrowClicked ? "0" : "1" },
        to: { opacity: arrowClicked ? "1" : "0" },
        config: { tension: 300, friction: 30 }
    })

    return (
        <div className={styles.playlistItem}>
            <div className={styles.playlistTitleParent}>
                <div className={styles.playlistTitleAndArrow}>
                    <h2>{props.playlist.playlistName}</h2>
                    <img onClick={onArrowClick} className={styles.playlistTitleArrow} src={arrowSVG} width="25px" />
                </div>
                <div className={styles.playlistActionsParent}>
                    <img src={playSVG} onMouseEnter={() => onPlayAction(true)} onMouseLeave={() => onPlayAction(false)} width="20px" />
                    <img src={editSVG} onMouseEnter={() => onEditAction(true)} onMouseLeave={() => onEditAction(false)} width="20px" />
                    <img src={deleteSVG} onMouseEnter={() => onDeleteAction(true)} onMouseLeave={() => onDeleteAction(false)} width="20px" />
                </div>
            </div>

            {arrowClicked && <animated.div style={showPlaylistAnim} className={styles.playlistWorksParent}>
                {props.playlist.works.map((work, index) => {
                    return <WorkItem key={index} index={index + 1} title={work.title} compName={work.complete_name} />
                })}
            </animated.div>}
        </div>
    )
}

export default PlaylistItem;