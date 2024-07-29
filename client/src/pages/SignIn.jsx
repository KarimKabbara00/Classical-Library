import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/signIn.module.css";
import googleLogo from "../images/google.svg";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";

function SignIn(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("accessToken")) {
            navigate("/profile");
            return;
        }

        var newUrl = "http://localhost:3000/signIn"
        window.history.pushState({ path: newUrl }, '', newUrl);
    }, [])

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    function updateUserInfo(event) {
        const { name, value } = event.target;
        setUserInfo(prev => {
            return {
                email: name === "email" ? value : prev.email,
                password: name === "password" ? value : prev.password,
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
            props.setUsername(res.data.user.user_metadata.displayName);
            props.setEmail(res.data.user.email)
            props.setAccessToken(res.data.access_token);
            props.setRefreshToken(res.data.refresh_token);
            props.setIsGoogleAuth(false);
            props.setWasSignedIn(true);
            toast.success("Signed in");
            navigate("/");
        }).catch(err => {
            err.response.data === true ? toast.error("Invalid username or password.") : toast.error("Error making request.")
        });
    }

    // sign up
    function goToSignUp() {
        navigate("/signUp");
    }

    // forgot password
    function goToForgotPassword() {
        navigate("/forgotPassword");
    }

    // Google OAuth
    function continueWithGoogle() {
        axios.post("http://localhost:3001/api/auth/google").then(res => {
            window.location.href = res.data;
        }).catch(err => {
            console.log(err);
        })
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
            <h1>Sign In</h1>
            <div className={styles.noAccount}>
                Don't have an account? <a className={styles.signUpHyperlink} onClick={goToSignUp}>Sign Up</a>
            </div>
            <form className={styles.signInBox} autoComplete="off" onSubmit={signIn} noValidate>
                {/* <input name="displayName" onInput={updateUserInfo} style={showSignUpElements} type="text" placeholder="Username" required={showSignUp} value={userInfo.displayName} /> */}

                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <input className={styles.signInInput} id="email" name="email" onInput={updateUserInfo} type="email" placeholder="Your Email" required value={userInfo.email} style={inputDarkmode} />
                </div>
                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="email">Password</label>
                    <input className={styles.signInInput} name="password" onInput={updateUserInfo} type={showPassword ? "text" : "password"} placeholder="Your Password" required value={userInfo.password} style={inputDarkmode} />
                    {userInfo.password.length > 0 && <div className={styles.peekPassword} onClick={peekPassword}><FontAwesomeIcon icon={peekSVG} /></div>}
                </div>

                <div className={styles.rememberForgot}>
                    <span className={styles.remember}>
                        <input id="rememberMe" type="checkbox" checked={props.rememberMe} onChange={(e) => props.setRememberMe(e.target.checked)} />
                        <label htmlFor="rememberMe">Remember me</label>
                    </span>
                    <span onClick={goToForgotPassword} className={styles.forgot}>Forgot your password?</span>
                </div>
                <button className={styles.signInButton} type="submit">Sign In</button>
            </form>

            <div className={styles.separator}>
                <div className={styles.bar}></div>
                <div>or</div>
                <div className={styles.bar}></div>
            </div>
            <div onClick={continueWithGoogle} className={styles.continueWithGoogle}>
                <img src={googleLogo} alt="Google Logo" width="20px" />
                <span style={{ color: "black" }}>Continue with Google</span>
            </div>
        </div>

    )
}

export default SignIn;