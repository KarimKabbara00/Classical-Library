import React, { useState } from "react";
import styles from "../css/signIn.module.css";
import googleLogo from "../images/google.svg";

function SignIn() {

    const [showSignUp, setShowSignUp] = useState(false);

    const dynamicHeight = {
        minHeight: "89vh",
        height: "89vh"
    };

    function onSignIn(event) {
        event.preventDefault();
    }

    function toggleShowSignUp() {
        setShowSignUp(!showSignUp);
    }

    const signInFormStyling = {
        height: showSignUp ? "16rem" : "12rem"
    }

    const confirmPasswordStyling = {
        display: showSignUp ? "block" : "none",
    }

    return (
        <div style={dynamicHeight}>
            <div className={styles.signInParent}>
                <div className={styles.signInBox}>
                    <form style={signInFormStyling} className={styles.signInForm} method="POST" onSubmit={onSignIn} autoComplete="off" >
                        <h1 className={styles.signInHeader}>Sign {showSignUp ? "Up" : "In"}</h1>
                        <input className={styles.signInField} type="text" placeholder="Email" required />
                        <input className={styles.signInField} type="password" placeholder="Password" required />
                        <input style={confirmPasswordStyling} className={styles.signInField} type="password" placeholder="Confirm Password" required={showSignUp} />
                        <div className={styles.signInButton}>Sign {showSignUp ? "Up" : "In"}</div>
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