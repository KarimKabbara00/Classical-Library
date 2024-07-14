import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/signIn.module.css";
import googleLogo from "../images/google.svg";
import PasswordReq from "../components/signIn/PasswordReq.jsx";
import classNames from "classnames";
import { animated, useSpring } from "@react-spring/web";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faE, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

function SignIn(props) {
    const navigate = useNavigate();
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

    // sign In
    function signIn(event) {
        event.preventDefault();

        if (userInfo.email.length < 1) {
            toast.error("Please enter an email.");
            return;
        }
        else if (userInfo.password.length < 1) {
            toast.error("Please enter a password.");
            return;
        }
        axios.post("http://localhost:3001/api/signIn", userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res.data);
            props.setSessionData(res.data);
            toast.success("Signed in");
            navigate("/");
        }).catch(err => {
            err.response.data === true ? toast.error("Invalid username or password.") : toast.error("Error making request.")
        });
    }

    // sign up
    const [showSignUp, setShowSignUp] = useState(null); // null for on-render
    function toggleShowSignUp() {
        showSignUp === null ? setShowSignUp(true) : void (0);
        setShowSignUp(!showSignUp);
        setUserInfo({  // clear form on change
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }

    function signUp(event) {
        event.preventDefault();
        console.log(passwordReqSatisfied)

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
            setPlayNudge(true);
            return;
        }
        axios.post("http://localhost:3001/api/signUp", userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            toast.success("Account created. Check your inbox to confirm your email.")
        }).catch(err => {
            toast.error(err.response.data);
        });
    }

    // Google OAuth
    function continueWithGoogle() {
        axios.post("http://localhost:3001/api/auth/google").then(res => {
            window.location.href = res.data;
        }).catch(err => {
            console.log(err);
        })
    }


    // ---- Nudge Animation ---- //
    const [playNudge, setPlayNudge] = useState(false);
    const passwordReqStyling = classNames({
        [styles.passwordRequirements]: true,
        [styles.applyNudge]: playNudge
    });

    function stopAnim() {
        setPlayNudge(false);
    }
    // ---- Nudge Animation ---- //

    const [showPassword, setShowPassord] = useState(false);
    const [peekSVG, setPeekSVG] = useState(faEye);
    function peekPassword() {
        setShowPassord(prev => !prev);
        showPassword ? setPeekSVG(faEye) : setPeekSVG(faEyeSlash);
    }

    const signInBoxStyling = {
        marginTop: showSignUp ? "5%" : "5%"
    }

    const showSignUpElements = {
        display: showSignUp ? "block" : "none",
    }

    const showPasswordReqs = useSpring({
        from: { transform: showSignUp ? "translate(300%, -15%)" : "translate(70%, -15%)" },
        to: { transform: showSignUp ? "translate(70%, -15%)" : "translate(300%, -15%)" },
        config: { tension: 200, friction: 30 },
    });

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={darkMode}>
            <div className={styles.signInParent}>
                <div style={signInBoxStyling} className={styles.signInBox}>
                    <form autoComplete="off" onSubmit={showSignUp ? signUp : signIn} className={styles.signInForm} noValidate>
                        <h1 className={styles.signInHeader}>Sign {showSignUp ? "Up" : "In"}</h1>
                        <input name="displayName" onInput={updateUserInfo} style={showSignUpElements} className={styles.signInField} type="text" placeholder="Username" required={showSignUp} value={userInfo.displayName} />
                        <input name="email" onInput={updateUserInfo} className={styles.signInField} type="email" placeholder="Email" required value={userInfo.email} />
                        <div>
                            {showSignUp !== null && <animated.div style={showPasswordReqs} className={passwordReqStyling} onAnimationEnd={stopAnim}>
                                <PasswordReq currentPass={userInfo.password} currentConfPass={userInfo.confirmPassword} passwordReqSatisfied={passwordReqSatisfied} setPasswordReqsSatisfied={setPasswordReqsSatisfied} darkModeEnabled={props.darkModeEnabled} />
                            </animated.div>}
                            <div style={{ position: "relative" }}>
                                <input name="password" onInput={updateUserInfo} className={styles.signInField} type={showPassword ? "text" : "password"} placeholder="Password" required value={userInfo.password} />
                                {userInfo.password.length > 0 && <div onClick={peekPassword} className={styles.peekPassword}><FontAwesomeIcon icon={peekSVG} /></div>}
                            </div>
                        </div>
                        {showSignUp && <div style={{ position: "relative" }}>
                            <input name="confirmPassword" onInput={updateUserInfo} className={styles.signInField} style={showSignUpElements} type="password" placeholder="Confirm Password" required={showSignUp} value={userInfo.confirmPassword} />
                        </div>}
                        <div>
                            <button type="submit" className={styles.signInButton}>Sign {showSignUp ? "Up" : "In"}</button>
                        </div>
                    </form>
                    <div className={styles.askUserText}>
                        {showSignUp ?
                            <span>
                                Already have an account? <a className={styles.signUpHyperlink} onClick={toggleShowSignUp}>Sign In</a>
                            </span> :
                            <span>
                                Don't have an account? <a className={styles.signUpHyperlink} onClick={toggleShowSignUp}>Sign Up</a>
                            </span>}
                    </div>
                    <div className={styles.or}>
                        <div className={styles.bar}></div>
                        <div>or</div>
                        <div className={styles.bar}></div>
                    </div>
                    <div onClick={continueWithGoogle} className={styles.continueWithGoogle}>
                        <img src={googleLogo} alt="Google Logo" width="20px" />
                        <span>Continue with Google</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;