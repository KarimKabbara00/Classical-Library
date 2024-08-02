import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/signIn.module.css";
import PasswordReq from "../components/signIn/PasswordReq.jsx";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie"
const baseURL = process.env.REACT_APP_BASE_URL;

function SignIn(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("accessToken")) {
            navigate("/profile");
            return;
        }
    }, [])

    const [passwordReqSatisfied, setPasswordReqsSatisfied] = useState(false);
    const [userInfo, setUserInfo] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function updateUserInfo(event) {
        const { name, value } = event.target;
        setUserInfo(prev => {
            return {
                displayName: name === "displayName" ? value : prev.displayName,
                email: name === "email" ? value : prev.email,
                password: name === "password" ? value : prev.password,
                confirmPassword: name === "confirmPassword" ? value : prev.confirmPassword
            }
        })
    }

    // sign in
    // function goToSignIn() {
    //     navigate("/signIn")
    // }

    const [showCheckEmail, setShowCheckEmail] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    function signUp(event) {
        event.preventDefault();

        if (userInfo.displayName.length < 1) {
            toast.error("Please enter a username.");
            return;
        }
        else if (userInfo.email.length < 1) {
            toast.error("Please enter an email.");
            return;
        }
        else if (userInfo.password.length < 1) {
            toast.error("Please enter a password.");
            return;
        }
        else if (!passwordReqSatisfied) {
            toast.error("Password requirements not met.");
            return;
        }

        setButtonClicked(true);
        axios.post(`${baseURL}/api/signUp`, userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            setShowCheckEmail(true);
            setButtonClicked(false);
        }).catch(err => {
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
        <>
            <div className={styles.mainParent} style={darkMode}>
                {!showCheckEmail && <div className={styles.signInParent} >
                    <h1 className={styles.title}>Sign Up</h1>
                    <form className={styles.signUpBox} autoComplete="off" onSubmit={signUp} noValidate>

                        <div className={styles.signInField}>
                            <label className={styles.inputLabel} htmlFor="displayName">Username</label>
                            <input className={styles.signInInput} id="displayName" name="displayName" onInput={updateUserInfo} type="text" placeholder="Username" required value={userInfo.displayName} style={inputDarkmode} />
                        </div>

                        <div className={styles.signInField}>
                            <label className={styles.inputLabel} htmlFor="email">Email</label>
                            <input className={styles.signInInput} id="email" name="email" onInput={updateUserInfo} type="email" placeholder="Your Email" required value={userInfo.email} style={inputDarkmode} />
                        </div>
                        <div className={styles.signInField}>
                            <label className={styles.inputLabel} htmlFor="password">Password</label>
                            <input className={styles.signInInput} id="password" name="password" onInput={updateUserInfo} type={showPassword ? "text" : "password"} placeholder="Your Password" required value={userInfo.password} style={inputDarkmode} />
                            {userInfo.password.length > 0 && <div className={styles.peekPassword} onClick={peekPassword}><FontAwesomeIcon icon={peekSVG} /></div>}
                        </div>
                        <div className={styles.signInField}>
                            <label className={styles.inputLabel} htmlFor="confirmPassword">Confirm Password</label>
                            <input className={styles.signInInput} id="confirmPassword" name="confirmPassword" onInput={updateUserInfo} type="password" placeholder="Confirm Password" required value={userInfo.confirmPassword} style={inputDarkmode} />
                        </div>
                        <PasswordReq currentPass={userInfo.password} currentConfPass={userInfo.confirmPassword} passwordReqSatisfied={passwordReqSatisfied} setPasswordReqsSatisfied={setPasswordReqsSatisfied} darkModeEnabled={props.darkModeEnabled} />

                        <button className={styles.signInButton} type="submit">Sign Up</button>
                        {buttonClicked && <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={{ fontSize: "1.75rem", alignSelf: "center", marginTop: "0.5rem" }} />}
                    </form>
                </div>}

                {showCheckEmail && <div className={styles.signInParent} style={{ alignItems: "center", ...darkMode }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: "-2rem", top: "50%", transform: "translateY(-50%)" }}>
                            <FontAwesomeIcon icon={faCheck} style={{ fontSize: "1.5rem" }} color="green" />
                        </div>
                        <h1>Thank you for signing up!</h1>
                    </div>

                    <div style={{ fontSize: "1.1rem", paddingTop: "1rem", paddingBottom: "0.25rem" }}>A confirmation email has been sent to your inbox.</div>
                    <div style={{ fontSize: "1.1rem" }}>You must verify your email before signing in.</div>
                </div >}
            </div>
        </>
    )
}

export default SignIn;