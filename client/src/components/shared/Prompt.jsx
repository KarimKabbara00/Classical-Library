import React, { useEffect, useState } from "react";
import styles from "../../css/shared.module.css";
import { useSpring, animated } from "@react-spring/web";

function Prompt(props) {

    function confirm() {
        props.callback(true);
    }
    function cancel() {
        props.callback(false)
    }

    // optional confirm phrase
    const [confirmCheckPassed, setConfirmCheckPassed] = useState(false);
    const [phrase, setPhrase] = useState("");
    useEffect(() => {
        setConfirmCheckPassed(phrase === props.confirmCheckPhrase);
    }, [phrase])

    // styling
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
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <animated.div style={promptAnim} className={styles.promptScreenCover}>
            <div style={promptParentDarkMode} className={styles.promptParent}>
                <h2>{props.title}</h2>
                <span>{props.description}</span>


                {props.confirmCheck && <div className={styles.confirmCheck}>
                    <div>Type '{props.confirmCheckPhrase}' to proceed:</div>
                    <input className={styles.confirmPhraseInput} onInput={(e) => setPhrase(e.target.value)} value={phrase} placeholder={props.confirmCheckPhrase} />
                </div>}


                <div className={styles.promptButtonsParent}>
                    <button style={buttonDarkMode} onClick={confirm} className={styles.promptButton} type="button" disabled={props.confirmCheck && !confirmCheckPassed}>{props.confirm}</button>
                    <button style={buttonDarkMode} onClick={cancel} className={styles.promptButton} type="button">{props.cancel}</button>
                </div>
            </div>
        </animated.div>

    )
}

export default Prompt;