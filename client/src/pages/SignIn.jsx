import React, { useState } from "react";
import axios from "axios";
import styles from "../css/signIn.module.css";
import googleLogo from "../images/google.svg";
import PasswordReq from "../components/signIn/PasswordReq.jsx";
import classNames from "classnames";
import { animated, useSpring } from "@react-spring/web";
import toast from 'react-hot-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';

function SignIn() {

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

    const [showSignUp, setShowSignUp] = useState(false);
    function toggleShowSignUp() {
        setShowSignUp(!showSignUp);
        setUserInfo({  // clear form on change
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }

    async function signIn(event) {
        event.preventDefault();

        if (userInfo.email.length < 1) {
            toast.error("Please enter an email.");
            return;
        }
        else if (userInfo.password.length < 1) {
            toast.error("Please enter a password.");
            return;
        }
        toast.success("Signed in")
        // await axios.post("http://localhost:3001/signIn", userInfo, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }).then(res => {
        //     console.log(res.data);
        // }).catch(err => {
        //     console.log(err);
        // });
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

    async function signUp(event) {
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
        // toast.success("Account created")
        // await axios.post("http://localhost:3001/signUp", userInfo, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }).then(res => {
        //     console.log(res.data);
        // }).catch(err => {
        //     console.log(err);
        // });
    }

    const [showPassword, setShowPassord] = useState(false);
    function peekPassword() {
        setShowPassord(prev => !prev);
    }

    const [showConfPass, setShowConfPass] = useState(false);
    function peekConfPass() {
        setShowConfPass(prev => !prev);
    }

    const dynamicHeight = {
        minHeight: "89vh",
        height: "89vh"
    };

    const signInBoxStyling = {
        marginTop: showSignUp ? "5%" : "7%"
    }

    const showSignUpElements = {
        display: showSignUp ? "block" : "none",
    }

    const showPasswordReqs = useSpring({
        from: { transform: showSignUp ? "translate(300%, -15%)" : "translate(0%, -15%)" },
        to: { transform: showSignUp ? "translate(0%, -15%)" : "translate(300%, -15%)" },
        config: { tension: 200, friction: 30 },
    });

    return (
        <div style={dynamicHeight}>
            <div className={styles.signInParent}>
                <div style={signInBoxStyling} className={styles.signInBox}>
                    <form autoComplete="off" onSubmit={showSignUp ? signUp : signIn} className={styles.signInForm} noValidate>
                        <h1 className={styles.signInHeader}>Sign {showSignUp ? "Up" : "In"}</h1>
                        <input name="displayName" onInput={updateUserInfo} style={showSignUpElements} className={styles.signInField} type="text" placeholder="Username" required={showSignUp} value={userInfo.displayName} />
                        <input name="email" onInput={updateUserInfo} className={styles.signInField} type="email" placeholder="Email" required value={userInfo.email} />
                        <div>
                            <animated.div style={showPasswordReqs} className={passwordReqStyling} onAnimationEnd={stopAnim}>
                                <PasswordReq currentPass={userInfo.password} currentConfPass={userInfo.confirmPassword} passwordReqSatisfied={passwordReqSatisfied} setPasswordReqsSatisfied={setPasswordReqsSatisfied} />
                            </animated.div>
                            <div style={{ position: "relative" }}>
                                <input name="password" onInput={updateUserInfo} className={styles.signInField} type={showPassword ? "text" : "password"} placeholder="Password" required value={userInfo.password} />
                                {userInfo.password.length > 0 && <div onMouseLeave={() => setShowPassord(false)} onMouseDown={peekPassword} onMouseUp={peekPassword} className={styles.peekPassword}><FontAwesomeIcon icon={faEye} /></div>}
                            </div>
                        </div>
                        <div style={{ position: "relative" }}>
                            <input name="confirmPassword" onInput={updateUserInfo} className={styles.signInField} style={showSignUpElements} type={showConfPass ? "text" : "password"} placeholder="Confirm Password" required={showSignUp} value={userInfo.confirmPassword} />
                            {userInfo.confirmPassword.length > 0 && <div onMouseLeave={() => setShowConfPass(false)} onMouseDown={peekConfPass} onMouseUp={peekConfPass} className={styles.peekPassword}><FontAwesomeIcon icon={faEye} /></div>}
                        </div>
                        <button type="submit" className={styles.signInButton}>Sign {showSignUp ? "Up" : "In"}</button>
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
                    <div className={styles.continueWithGoogle}>
                        <img src={googleLogo} width="20px" />
                        <span>Continue with Google</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;