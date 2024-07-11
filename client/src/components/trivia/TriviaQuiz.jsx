import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import TriviaAnswer from "./TriviaAnswer";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import sharedStyles from "../../css/shared.module.css";
import styles from "../../css/trivia.module.css";
import loadingStyles from "../../css/loading.module.css";

function Trivia() {

    const [triviaQuestions, setTriviaQuestions] = useState([]); // array of objects that include questions and array of answers
    const [triviaAnswers, setTriviaAnswers] = useState([]); // array of strings of answers
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3001/api/trivia").then(res => {
            setTriviaQuestions(res.data);
            // grab answers from object
            let answers = res.data.map(question => {
                return question.answers[0];
            })
            setTriviaAnswers(answers);
            console.log(answers);
            setShowLoading(false);
        }).catch(err => {
            console.log(err);
            setShowLoading(false);
            setShowError(true);
        })
    }, []);


    const [selected, setSelected] = useState("");

    function handleAction(event) {
        setSelected(event.target.value.toString())
        console.log(event.target.value.toString())
    }

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    const contentStyling = classNames({
        [styles.triviaMainBody]: true,
        [styles.applyFadeIn]: !showLoading,
    });


    return (
        <div className={contentStyling}>
            <div className={loadingStyling}>
                <Loading />
            </div>

            <div className={sharedStyles.errorParent}>
                <Error showError={showError} />
            </div>

            {!showLoading && !showError &&
                <div className={styles.triviaQuizBody}>
                    <div className={styles.triviaHeader}>
                        <h2>Question {currentIndex + 1} / 5</h2>
                        <div>bar</div>
                    </div>
                    <div className={styles.triviaQuizAnswerParent}>
                        <h1>{triviaQuestions[currentIndex].question}</h1>
                        {triviaQuestions[currentIndex].answers.map((answer, index) => {
                            return <TriviaAnswer key={index} index={index.toString()} handleAction={handleAction} selected={selected} answer={answer} />
                        })}
                    </div>
                    <button type="button">Next</button>
                </div>
            }
        </div>
    )
}

export default Trivia;