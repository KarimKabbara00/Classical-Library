import React from "react";
import styles from "../../css/navigation.module.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";

function Profile(props) {

    const navigate = useNavigate();

    function goToPlaylists() {
        navigate("/profile/playlists")
    }

    function logout() {
        props.logout()
    }

    return (
        <div className={styles.hiddenProfileBox}>
            <div className={styles.profileBox}>
                <div onClick={goToPlaylists}><ProfileButton text={"Account"} /></div>
                <ProfileButton text={"Playlists"} />
                <ProfileButton text={"Contribute"} />
                <div onClick={logout}><ProfileButton text={"Logout"} /></div>
            </div>
        </div>
    )
}

export default Profile;