import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/signIn.module.css";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const baseURL = process.env.REACT_APP_BASE_URL;

function ForgotPassword(props) {


    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("accessToken")) {
            navigate("/profile");
            return;
        }
        var newUrl = `${baseURL}/signIn`
        window.history.pushState({ path: newUrl }, '', newUrl);
    }, [])

    const [userEmail, setUserEmail] = useState("");
    function updateUserEmail(event) {
        const { value } = event.target;
        setUserEmail(value);
    }

    const [showCheckEmail, setShowCheckEmail] = useState(false);
    const [showSpinny, setShowSpinny] = useState(false);

    const [key, setKey] = useState(0);  // used to rerender circle timer countdown
    const [timerExpired, setTimerExpired] = useState(false);
    function forgotPassword(event) {
        event.preventDefault();

        if (userEmail.length < 1) {
            toast.error("Please enter an email address.");
            return;
        }
        setShowSpinny(true);
        setTimerExpired(false);
        setKey(prev => prev + 1);

        axios.post(`${baseURL}/api/forgotPassword`, { userEmail: userEmail }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            toast.success("Check your email for a reset link.");
            setShowCheckEmail(true);
            setShowSpinny(false);
        }).catch(err => {
            let errMsg = err.response.data.code === "validation_failed" ? "Please enter a valid email address." : "Error making request.";
            toast.error(errMsg);
            setShowSpinny(false);
        });
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
            <form className={styles.signInBox} autoComplete="off" noValidate onSubmit={forgotPassword}>
                <h1>Forgot Password</h1>
                <div className={styles.signInField}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <input className={styles.signInInput} id="email" name="email" onInput={updateUserEmail} type="email" placeholder="Your Email" required value={userEmail} style={inputDarkmode} />
                </div>
                <div className={styles.buttonAndCircleTimer}>
                    <button disabled={showCheckEmail && !timerExpired} className={styles.signInButton} type="submit">Send Reset Link</button>
                    {showCheckEmail && !timerExpired && <div className={styles.circleTimer}>
                        <CountdownCircleTimer
                            key={key}
                            isPlaying
                            duration={30}
                            size={25}
                            strokeWidth={4}
                            colors={["#a52a2a"]}
                            colorsTime={[10]}
                            onComplete={() => setTimerExpired(true)}
                        />
                    </div>}
                </div>
            </form >

            <div className={styles.afterSubmit}>
                {showSpinny && <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={{ fontSize: "1.5rem" }} />}
                {showCheckEmail && <div style={{ fontSize: "1.1rem" }}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                    <span style={{ marginLeft: "0.5rem" }}>A password reset link has been sent to the provided email address if it exists in our system.</span>
                </div>}
            </div>


        </div >

    )
}

export default ForgotPassword;