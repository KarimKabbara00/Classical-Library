import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/signIn.module.css";
import PasswordReq from "../components/signIn/PasswordReq.jsx";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ResetPassword(props) {

    const navigate = useNavigate();

    useEffect(() => {
        try {
            let accessToken = window.location.href.split("/reset#access_token=")[1].split("&expires_at")[0];
            let refreshToken = window.location.href.split("&refresh_token=")[1].split("&token_type")[0];
            props.setAccessToken(accessToken);
            props.setRefreshToken(refreshToken);
            let newUrl = "http://localhost:3000/forgotPassword/reset"
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
        catch (e) {
            console.log(e);
            navigate("/")
        }

    }, []);

    const [passwordReqSatisfied, setPasswordReqsSatisfied] = useState(false);
    const [userInfo, setUserInfo] = useState({
        password: "",
        confirmPassword: "",
    });

    function updateUserInfo(event) {
        const { name, value } = event.target;
        setUserInfo(prev => {
            return {
                password: name === "password" ? value : prev.password,
                confirmPassword: name === "confirmPassword" ? value : prev.confirmPassword
            }
        })
    }

    function resetPassword(event) {
        event.preventDefault();

        if (userInfo.password.length < 1) {
            toast.error("Please enter a password.");
            return;
        }
        else if (!passwordReqSatisfied) {
            toast.error("Password requirements not met.");
            return;
        }
        axios.post("http://localhost:3001/api/resetPassword", userInfo, {
            headers: {
                'Content-Type': 'application/json',
                'accessToken': `Bearer ${props.accessToken}`,
                'refreshToken': props.refreshToken
            },
        }).then(res => {
            toast.success("Password changed.");
            navigate("/");
        }).catch(err => {
            console.log(err.response.data);
            toast.error(err.response.data);
        });
    }

    const [showPassword, setShowPassord] = useState(false);
    const [peekSVG, setPeekSVG] = useState(faEye);
    function peekPassword() {
        setShowPassord(prev => !prev);
        showPassword ? setPeekSVG(faEye) : setPeekSVG(faEyeSlash);
    }

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        height: "94.5vh"
    }
    const inputDarkmode = {
        backgroundColor: props.darkModeEnabled ? "#e8e6e3" : "",
    }
    // -------------------- Dark Mode -------------------- //

    return (

        <div className={styles.signInParent} style={darkMode}>
            <h1>Reset Password</h1>
            <form className={styles.signUpBox} autoComplete="off" onSubmit={resetPassword} noValidate>

                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="password">New Password</label>
                    <input className={styles.signInInput} id="password" name="password" onInput={updateUserInfo} type={showPassword ? "text" : "password"} placeholder="Your New Password" required value={userInfo.password} style={inputDarkmode} />
                    {userInfo.password.length > 0 && <div className={styles.peekPassword} onClick={peekPassword}><FontAwesomeIcon icon={peekSVG} /></div>}
                </div>
                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="confirmPassword">Confirm New Password</label>
                    <input className={styles.signInInput} id="confirmPassword" name="confirmPassword" onInput={updateUserInfo} type="password" placeholder="Confirm New Password" required value={userInfo.confirmPassword} style={inputDarkmode} />
                </div>
                <PasswordReq currentPass={userInfo.password} currentConfPass={userInfo.confirmPassword} passwordReqSatisfied={passwordReqSatisfied} setPasswordReqsSatisfied={setPasswordReqsSatisfied} darkModeEnabled={props.darkModeEnabled} />

                <button className={styles.signInButton} type="submit">Reset Password</button>
            </form>

        </div>

    )
}

export default ResetPassword;