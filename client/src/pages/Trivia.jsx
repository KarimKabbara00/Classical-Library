import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/trivia.module.css";

function Trivia(props) {

    const navigate = useNavigate();

    function startQuiz() {
        navigate("/trivia/quiz");
    }

    // -------------------- Dark Mode -------------------- //
    const triviaIntroMainBodyDarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : ""
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={triviaIntroMainBodyDarkMode} className={styles.triviaIntroMainBody}>
            <div className={styles.header}>
                <h1>Classical Music Trivia</h1>
                <h3>Test Your Knowledege!</h3>
            </div>

            <div className={styles.triviaDescription}>
                Welcome to Classical Music Trivia! Challenge yourself with questions about legendary
                composers, musical eras, iconic works, and orchestral instruments. Whether you're a
                maestro or a novice, enjoy fun and educational questions that celebrate the beauty and
                history of classical music.
            </div>
            <div>
                <button onClick={startQuiz} type="button" className={styles.startButton}>Start</button>
            </div>
        </div>
    )
}

export default Trivia;