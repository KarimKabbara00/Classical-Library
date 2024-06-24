import React from "react";
import styles from "../../css/navigation.module.css";
import ProfileButton from "./ProfileButton";

function Profile(props) {

    function logout() {
        props.logout()
    }

    return (
        <div className={styles.hiddenProfileBox}>
            <div className={styles.profileBox}>
                <ProfileButton text={"Account"} />
                <ProfileButton text={"Playlists"} />
                <ProfileButton text={"Contribute"} />
                <div onClick={logout}><ProfileButton text={"Logout"} /></div>
            </div>
        </div>
    )
}

export default Profile;