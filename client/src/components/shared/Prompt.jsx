import React from "react";
import styles from "../../css/shared.module.css";
import { useSpring, animated } from "@react-spring/web";

function Prompt(props) {

    function confirm() {
        props.callback(true);
    }
    function cancel() {
        props.callback(false)
    }

    const promptAnim = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: 100 }
    })

    // -------------------- Dark Mode -------------------- //
    const promptParentDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        border: props.darkModeEnabled ? "1px solid #e8e6e3" : "",
    }
    const buttonDarkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : "",
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <animated.div style={promptAnim} className={styles.promptScreenCover}>
            <div style={promptParentDarkMode} className={styles.promptParent}>
                <h2>{props.title}</h2>
                <span>{props.description}</span>
                <div className={styles.promptButtonsParent}>
                    <div style={buttonDarkMode} onClick={confirm} className={styles.promptButton}>{props.confirm}</div>
                    <div style={buttonDarkMode} onClick={cancel} className={styles.promptButton}>{props.cancel}</div>
                </div>
            </div>
        </animated.div>

    )
}

export default Prompt;