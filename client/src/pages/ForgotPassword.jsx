import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/signIn.module.css";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword(props) {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    function updateUserEmail(event) {
        const { value } = event.target;
        setUserEmail(value);
        console.log(value)
    }

    const [showCheckEmail, setShowCheckEmail] = useState(false);
    const [showSpinny, setShowSpinny] = useState(false);
    function forgotPassword(event) {
        event.preventDefault();

        if (showCheckEmail)
            return;

        if (userEmail.length < 1) {
            toast.error("Please enter an email.");
            return;
        }
        setShowSpinny(true);
        axios.post("http://localhost:3001/api/forgotPassword", { userEmail: userEmail }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            toast.success("Check your email for a reset link.");
            setShowCheckEmail(true);
            setShowSpinny(false);
        }).catch(err => {
            toast.error("Error making request.")
        });
    }

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (

        <div className={styles.signInParent}>
            <h1>Forgot Password</h1>
            <form className={styles.signInBox} autoComplete="off" onSubmit={forgotPassword} noValidate>
                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <input className={styles.signInInput} id="email" name="email" onInput={updateUserEmail} type="email" placeholder="Your Email" required value={userEmail} />
                </div>
                <button disabled={showCheckEmail} className={styles.signInButton} type="submit">Send Reset Link</button>
            </form>
            <div className={styles.afterSubmit}>
                {showSpinny && <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={{ fontSize: "1.5rem" }} />}
                {showCheckEmail && <div style={{ fontSize: "1.1rem" }}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                    <span style={{ marginLeft: "0.5rem" }}>A password reset link has been sent to the provided email address if it exists in our system.</span>
                </div>}
            </div>


        </div>

    )
}

export default ForgotPassword;