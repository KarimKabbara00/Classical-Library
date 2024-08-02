import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/profile.module.css";
import Prompt from "../components/shared/Prompt";
import axios from "axios";
import toast from "react-hot-toast";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { refreshSession } from "../sessionHandler";
const baseURL = process.env.REACT_APP_BASE_URL;

function Profile(props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get("accessToken") && !props.wasSignedIn) {
            navigate("/signIn");
            return;
        }
        else if (!Cookies.get("accessToken") && props.wasSignedIn) {
            refreshSession(props.accessToken, props.refreshToken, props.setAccessToken, props.setRefreshToken);
        }
    }, []);

    // Change password
    const [showChangePassword, setShowChangePassword] = useState(true && !props.isGoogleAuth);
    function handlePasswordClick() {
        setShowChangePassword(true);
        setShowDeleteAccount(false);
    }

    const [showCheckEmail, setShowCheckEmail] = useState(false);
    const [showSpinny, setShowSpinny] = useState(false);

    const [key, setKey] = useState(0);  // used to rerender circle timer countdown
    const [timerExpired, setTimerExpired] = useState(false);

    function sendResetLink() {

        setShowSpinny(true);
        setTimerExpired(false);
        setShowCheckEmail(false);
        setKey(prev => prev + 1);

        axios.post(`${baseURL}/api/forgotPassword`, { userEmail: props.email }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            toast.success("Check your email for a reset link.");
            setShowCheckEmail(true);
            setShowSpinny(false);
        }).catch(err => {
            let errMsg = err.response.data.code === "validation_failed" ? "Please enter a valid email address." : "Error making request.";
            toast.error(errMsg);
            setShowSpinny(false);
        });
    }

    // Delete
    const [showDeleteAccount, setShowDeleteAccount] = useState(false || props.isGoogleAuth);
    const [showPromptDelete, setShowPromptDelete] = useState(false);
    function handleDeleteClick() {
        setShowChangePassword(false);
        setShowDeleteAccount(true);
    }
    function promptDelete() {
        setShowPromptDelete(true);
    }
    function deleteAccount(action) {
        if (action !== true) {
            setShowPromptDelete(false);
            return;
        }
        axios.post(`${baseURL}/api/deleteAccount`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'accessToken': `Bearer ${props.accessToken}`,
            },
        }).then(res => {
            props.logout("Account deleted.");
            navigate("/");
        }).catch(err => {
            console.log(err);
            toast.error("Error deleting account.")
        })
    }

    // darkmode
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        height: "94.5vh"
    }

    return (
        <div className={styles.profileParent} style={darkMode}>
            <div className={styles.contentParent}>
                <h1 className={styles.headerStyle}>Account</h1>
                <div className={styles.content}>
                    <div className={styles.sidebar}>
                        {!props.isGoogleAuth && <span style={{ borderBottom: showChangePassword ? "2px solid brown" : "" }} onClick={handlePasswordClick}>
                            Change Password
                        </span>}
                        <span style={{ borderBottom: showDeleteAccount ? "2px solid brown" : "" }} onClick={handleDeleteClick}>
                            Delete Account
                        </span>
                    </div>
                    <div style={{ width: "100%", position: "relative" }}>
                        {/* Change password */}
                        {showChangePassword && <div className={styles.contentItem}>
                            <h3>Change your Password</h3>
                            <span>Send a password reset link to your email.</span>

                            <button onClick={sendResetLink} className={styles.button} disabled={showCheckEmail && !timerExpired}>Send Reset Link</button>
                            <div className={styles.afterSubmit} style={{ width: showSpinny ? "65%" : "", justifyContent: showSpinny ? "center" : "flex-start" }}>

                                {showSpinny && <div>
                                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={{ fontSize: "1.5rem" }} />
                                </div>}

                                {showCheckEmail && <div style={{ display: "flex", alignItems: "center", gap: "0rem 0.5rem" }}>
                                    <div style={{ fontSize: "1.1rem" }}>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                                        <span style={{ marginLeft: "0.5rem", fontSize: "1rem" }}>A password reset link has been sent to your email.</span>
                                    </div>
                                    {!timerExpired && <div className={styles.circleTimer}>
                                        <CountdownCircleTimer
                                            key={key}
                                            isPlaying
                                            duration={30}
                                            size={25}
                                            strokeWidth={4}
                                            colors={["#a52a2a"]}
                                            colorsTime={[10]}
                                            onComplete={() => setTimerExpired(true)}
                                        />
                                    </div>}
                                </div>}
                            </div>
                        </div>}

                        {/* Delete account */}
                        {showDeleteAccount && <div className={styles.contentItem}>
                            <h3>Delete your Account</h3>
                            <span>This action will wipe all records of your account and delete any associated data.</span>
                            <button onClick={promptDelete} className={styles.button} type="button">Delete Account</button>
                        </div>}
                    </div>
                </div>
            </div>
            {showPromptDelete && <Prompt
                title={"Delete account"}
                description={"This action cannot be undone."}
                confirm={"Delete"}
                cancel={"Cancel"}
                callback={deleteAccount}
                confirmCheck={true}
                confirmCheckPhrase={"Delete my account forever"}
                darkModeEnabled={props.darkModeEnabled}
            />}
        </div>
    )
}

export default Profile