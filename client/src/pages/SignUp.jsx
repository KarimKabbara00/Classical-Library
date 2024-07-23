import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/signIn.module.css";
import PasswordReq from "../components/signIn/PasswordReq.jsx";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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

    // sign in
    function goToSignIn() {
        navigate("/signIn")
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
            toast.error("Password requirements not met.");
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

    const [showPassword, setShowPassord] = useState(false);
    const [peekSVG, setPeekSVG] = useState(faEye);
    function peekPassword() {
        setShowPassord(prev => !prev);
        showPassword ? setPeekSVG(faEye) : setPeekSVG(faEyeSlash);
    }

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (

        <div className={styles.signInParent}>
            <h1>Sign Up</h1>
            {/* <div className={styles.noAccount}>
                Already have an account? <a className={styles.signUpHyperlink} onClick={goToSignIn}>Sign In</a>
            </div> */}
            <form className={styles.signUpBox} autoComplete="off" onSubmit={signUp} noValidate>

                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="displayName">Username</label>
                    <input className={styles.signInInput} id="displayName" name="displayName" onInput={updateUserInfo} type="text" placeholder="Username" required value={userInfo.displayName} />
                </div>

                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <input className={styles.signInInput} id="email" name="email" onInput={updateUserInfo} type="email" placeholder="Your Email" required value={userInfo.email} />
                </div>
                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="password">Password</label>
                    <input className={styles.signInInput} id="password" name="password" onInput={updateUserInfo} type={showPassword ? "text" : "password"} placeholder="Your Password" required value={userInfo.password} />
                    {userInfo.password.length > 0 && <div className={styles.peekPassword} onClick={peekPassword}><FontAwesomeIcon icon={peekSVG} /></div>}
                </div>
                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="confirmPassword">Confirm Password</label>
                    <input className={styles.signInInput} id="confirmPassword" name="confirmPassword" onInput={updateUserInfo} type="password" placeholder="Confirm Password" required value={userInfo.confirmPassword} />
                </div>
                <PasswordReq currentPass={userInfo.password} currentConfPass={userInfo.confirmPassword} passwordReqSatisfied={passwordReqSatisfied} setPasswordReqsSatisfied={setPasswordReqsSatisfied} darkModeEnabled={props.darkModeEnabled} />

                <button className={styles.signInButton} type="submit">Sign Up</button>
            </form>

        </div>

    )
}

export default SignIn;