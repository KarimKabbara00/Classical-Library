import React, { useState } from "react";
import axios from "axios";
import styles from "../css/signIn.module.css";
import googleLogo from "../images/google.svg";
import check from "../images/check.svg";
import x from "../images/x.svg";

function SignIn() {

    const [showSignUp, setShowSignUp] = useState(false);

    const dynamicHeight = {
        minHeight: "89vh",
        height: "89vh"
    };

    function toggleShowSignUp() {
        setShowSignUp(!showSignUp);
        setUserInfo(prev => {
            // clear form on change
            return {
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        })
    }

    const signInFormStyling = {
        height: showSignUp ? "18rem" : "12rem"
    }

    const hiddenSignUpStyling = {
        display: showSignUp ? "block" : "none",
    }

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

        if (userInfo.password !== userInfo.confirmPassword) {
            return;
        }
        await axios.post("http://localhost:3001/signUp", userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div style={dynamicHeight}>
            <div className={styles.signInParent}>
                {showSignUp && <div className={styles.passwordRequirements}>
                    <div>Password must:</div>
                    <div className={styles.passwordReq}><img src={x} width="13px" />Contain 8 to 30 characters</div>
                    <div className={styles.passwordReq}><img src={x} width="13px" />Contain both uppercase and lowercase letters</div>
                    <div className={styles.passwordReq}><img src={x} width="13px" />Contain 1 number</div>
                    <div className={styles.passwordReq}><img src={x} width="13px" />Contain 1 special character</div>
                    <div className={styles.passwordReq}><img src={x} width="13px" />Match</div>
                </div>}
                <div className={styles.signInBox}>
                    <form autoComplete="off" onSubmit={showSignUp ? signUp : signIn} style={signInFormStyling} className={styles.signInForm} >
                        <h1 className={styles.signInHeader}>Sign {showSignUp ? "Up" : "In"}</h1>
                        <input name="displayName" onInput={updateUserInfo} style={hiddenSignUpStyling} className={styles.signInField} type="text" placeholder="Display Name" required={showSignUp} value={userInfo.displayName} />
                        <input name="email" onInput={updateUserInfo} className={styles.signInField} type="email" placeholder="Email" required value={userInfo.email} />
                        <input name="password" onInput={updateUserInfo} className={styles.signInField} type="password" placeholder="Password" required value={userInfo.password} />
                        <input name="confirmPassword" onInput={updateUserInfo} style={hiddenSignUpStyling} className={styles.signInField} type="password" placeholder="Confirm Password" required={showSignUp} value={userInfo.confirmPassword} />
                        <button type="submit" className={styles.signInButton}>Sign {showSignUp ? "Up" : "In"}</button>
                    </form>
                    <div style={{ color: "white" }}>
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