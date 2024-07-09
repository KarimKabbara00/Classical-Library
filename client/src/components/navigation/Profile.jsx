import React from "react";
import styles from "../../css/navigation.module.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";

function Profile(props) {

    const navigate = useNavigate();

    function goToAccount() {
        return;
    }

    function goToPlaylists() {
        navigate("/profile/playlists");
    }

    function logout() {
        props.logout();
    }

    return (
        <div className={styles.hiddenProfileBox}>
            <div className={styles.profileBox}>
                <div onClick={goToAccount}><ProfileButton text={"Account"} /></div>
                <div onClick={goToPlaylists}><ProfileButton text={"Playlists"} /></div>
                <div onClick={logout}><ProfileButton text={"Logout"} /></div>
            </div>
        </div>
    )
}

export default Profile;