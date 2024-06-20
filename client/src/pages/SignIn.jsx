import React, { useState } from "react";
import axios from "axios";
import styles from "../css/signIn.module.css";
import googleLogo from "../images/google.svg";

function SignIn() {

    const [showSignUp, setShowSignUp] = useState(false);

    const dynamicHeight = {
        minHeight: "89vh",
        height: "89vh"
    };

    function toggleShowSignUp() {
        setShowSignUp(!showSignUp);
        setUserInfo(prev => {
            return {
                email: prev.email,
                password: prev.password,
                confirmPassword: "" // clear conf pass on change
            }
        })
    }

    const signInFormStyling = {
        height: showSignUp ? "16rem" : "12rem"
    }

    const confirmPasswordStyling = {
        display: showSignUp ? "block" : "none",
    }

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    function updateUserInfo(event) {
        const { name, value } = event.target;
        setUserInfo(prev => {
            return {
                email: name === "email" ? value : prev.email,
                password: name === "password" ? value : prev.password,
                confirmPassword: name === "confirmPassword" ? value : ""
            }
        })
    }

    async function signIn(event) {
        event.preventDefault();
        await axios.post("http://localhost:3001/signIn", userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    async function signUp(event) {
        event.preventDefault();
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

    return (
        <div style={dynamicHeight}>
            <div className={styles.signInParent}>
                <div className={styles.signInBox}>
                    <form autoComplete="off" onSubmit={showSignUp ? signUp : signIn} style={signInFormStyling} className={styles.signInForm} >
                        <h1 className={styles.signInHeader}>Sign {showSignUp ? "Up" : "In"}</h1>
                        <input name="email" onInput={updateUserInfo} className={styles.signInField} type="text" placeholder="Email" required value={userInfo.email} />
                        <input name="password" onInput={updateUserInfo} className={styles.signInField} type="password" placeholder="Password" required value={userInfo.password} />
                        <input name="confirmPassword" onInput={updateUserInfo} style={confirmPasswordStyling} className={styles.signInField} type="password" placeholder="Confirm Password" required={showSignUp} value={userInfo.confirmPassword} />
                        <button type="submit" className={styles.signInButton}>Sign {showSignUp ? "Up" : "In"}</button>
                    </form>
                    <div style={{ color: "white" }}>
                        {showSignUp ?
                            <span>
                                Already have an account? <a className={styles.signUpHyperlink} onClick={toggleShowSignUp}>Sign In</a>
                            </span> :
                            <span>
                                Dont have an account? <a className={styles.signUpHyperlink} onClick={toggleShowSignUp}>Sign Up</a>
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