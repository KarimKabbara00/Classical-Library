import React, { useEffect, useState } from "react";
import styles from "../../css/navigation.module.css";

import accountBrown from "../../images/profile/account-brown.svg";
import accountWhite from "../../images/profile/account-white.svg";
import contributeBrown from "../../images/profile/contribute-brown.svg";
import contributeWhite from "../../images/profile/contribute-white.svg";
import playlistBrown from "../../images/profile/playlist-brown.svg";
import playlistWhite from "../../images/profile/playlist-white.svg";
import signOutBrown from "../../images/profile/sign-out-brown.svg";
import signOutWhite from "../../images/profile/sign-out-white.svg";

function ProfileButton(props) {

    const [icon, setIcon] = useState(null)
    useEffect(() => {
        props.text === "Profile" ? setIcon(accountBrown) : void (0);
        props.text === "Playlists" ? setIcon(playlistBrown) : void (0);
        props.text === "Contribute" ? setIcon(contributeBrown) : void (0);
        props.text === "Logout" ? setIcon(signOutBrown) : void (0);
    }, [props.text]);

    const [isHovered, setIsHovered] = useState(false);
    function onHover() {
        setIsHovered(prev => !prev);
        props.text === "Profile" ? (!isHovered ? setIcon(accountWhite) : setIcon(accountBrown)) : void (0);
        props.text === "Playlists" ? (!isHovered ? setIcon(playlistWhite) : setIcon(playlistBrown)) : void (0);
        props.text === "Contribute" ? (!isHovered ? setIcon(contributeWhite) : setIcon(contributeBrown)) : void (0);
        props.text === "Logout" ? (!isHovered ? setIcon(signOutWhite) : setIcon(signOutBrown)) : void (0);
    }

    return (
        <div onMouseEnter={onHover} onMouseLeave={onHover} className={styles.profileButtonParent}>
            <div className={styles.profileButtonIcon}><img src={icon} width="35px" /></div>
            <div className={styles.profileButton}>{props.text}</div>
        </div>

    )
}

export default ProfileButton;