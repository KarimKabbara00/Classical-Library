import React from "react";
import styles from "../../css/navigation.module.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";

function ProfileBox(props) {

    const navigate = useNavigate();

    function goToProfile() {
        navigate("/profile");
    }

    function goToPlaylists() {
        navigate("/profile/playlists");
    }

    function logout() {
        props.logout();
        if (window.location.href.includes("profile"))
            navigate("/")
    }

    // -------------------- Dark Mode -------------------- //
    const profileBoxDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        border: props.darkModeEnabled ? "1px solid #e8e6e3" : ""
    }
    // -------------------- Dark Mode -------------------- //


    return (
        <div className={styles.hiddenProfileBox}>
            <div style={profileBoxDarkMode} className={styles.profileBox}>
                <div onClick={goToProfile}><ProfileButton text={"Profile"} /></div>
                <div onClick={goToPlaylists}><ProfileButton text={"Playlists"} /></div>
                <div onClick={logout}><ProfileButton text={"Logout"} /></div>
            </div>
        </div>
    )
}

export default ProfileBox;