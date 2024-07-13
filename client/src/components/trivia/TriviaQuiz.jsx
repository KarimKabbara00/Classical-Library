import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import classNames from "classnames";
import TriviaAnswer from "./TriviaAnswer";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import sharedStyles from "../../css/shared.module.css";
import styles from "../../css/trivia.module.css";
import loadingStyles from "../../css/loading.module.css";
import BackToTop from "../../components/shared/BackToTop";
import arrowLeftBlack from "../../images/arrow-left-black.svg"
import arrowLeftBrown from "../../images/arrow-left-brown.svg"

function countScore(selectedAnswersObject, correctAnswers, originalQnA) {
    var score = 0;
    for (let i = 0; i < 5; i++) {
        let correctAnswer = correctAnswers[i]
        let aIndex = selectedAnswersObject[i]
        correctAnswer === originalQnA[i].answers[aIndex] ? score++ : void (0)
    }
    return score;
}

function randomizeAnswers(quiz) {

    function randomizeArray(array) {
        // start at end
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            // rand from 0 to current index
            let randomIndex = Math.floor(Math.random() * currentIndex);
            // narrow the window 
            currentIndex--;
            // swap a elements 
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // for every answer list, randomize it 
    for (let i in quiz) {
        quiz[i].answers = randomizeArray(quiz[i].answers);
    }
    return quiz;
}

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600).toString().padStart(2, '0') + ":";
    hours = hours === "00:" ? "" : hours;
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60).toString().padStart(2, '0') + ":";
    seconds = (seconds % 60).toString().padStart(2, '0');
    return `${hours}${minutes}${seconds}`
}

function Trivia() {

    const [triviaQuestions, setTriviaQuestions] = useState([]); // array of objects that include questions and array of answers
    const [triviaAnswers, setTriviaAnswers] = useState([]); // array of strings of answers
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // track which question we are on
    const [selectedAnswers, setSelectedAnswers] = useState({}); // object -> k:qIndex, v:aIndex
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    useEffect(() => {

        axios.get("http://localhost:3001/api/trivia").then(res => {
            // grab answers
            let answers = res.data.map(question => {
                console.log(question.answers[0]);
                return question.answers[0];
            })
            // answer list comes in with correct answer at index 0, so randomize
            setTriviaQuestions(randomizeAnswers(res.data));
            setTriviaAnswers(answers);
            setShowLoading(false);
        }).catch(err => {
            console.log(err);
            setShowLoading(false);
            setShowError(true);
        })
    }, []);

    // force an update when an answer is clicked to show highlight
    const [state, forceUpdate] = useReducer(x => x + 1, 1);
    function addSelectedAnswer(answerIndex) {
        setSelectedAnswers(prev => {
            prev[currentQuestionIndex] = answerIndex;
            return prev;
        });
        forceUpdate();
    }

    // handling of quiz progress and completion
    const [progressPercentage, setProgressPercentage] = useState(20); // %
    const [finalScore, setFinalScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    function incrementIndex(increment) { // also submits quiz
        // if on last question and increment is pressed, submit (if button is not disabled)
        if (currentQuestionIndex === 4 && increment === true) {
            let score = countScore(selectedAnswers, triviaAnswers, triviaQuestions)
            setFinalScore(score);
            setQuizComplete(true);
            return; // quiz complete
        }

        if (increment === true) {
            setCurrentQuestionIndex(prev => {
                setProgressPercentage((prev + 2) / 5 * 100) // plus two to account for increment and 0 indexing
                return prev + 1;
            });
        }
        else {
            setCurrentQuestionIndex(prev => {
                setProgressPercentage(prev / 5 * 100) // -1 for decrement and +1 0 indexing
                return prev - 1;
            });
        }
    }

    const progressBarAnim = useSpring({
        from: {
            background: progressPercentage !== 20 ?
                `linear-gradient(to right, brown ${progressPercentage - 20}%, white ${progressPercentage - 20}%)`
                :
                `linear-gradient(to right, brown ${progressPercentage}%, white ${progressPercentage - 20}%)` // this catches start up case so that the progress bar doesnt animate on load
        },
        to: { background: `linear-gradient(to right, brown ${progressPercentage}%, white ${progressPercentage}%)` },
        config: { duration: 200 },
    })

    // take quiz again
    const navigate = useNavigate()
    function restartQuiz() {
        navigate(0);
    }

    // timer
    useEffect(() => {
        // dont count if loading or error
        if (showLoading || showError || quizComplete) {
            return;
        }

        // count time
        var timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1)
        }, 1000);


        return () => clearInterval(timer);
    }, [showLoading, quizComplete])

    const [arrowSVG, setArrowSVG] = useState(arrowLeftBlack);

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    // fade in after loading
    const contentStyling = classNames({
        [styles.triviaMainBody]: true,
        [styles.applyFadeIn]: !showLoading,
    });

    // after the quiz is submitted
    const triviaQuizQuestionFinal = classNames({
        [styles.triviaQuizQuestion]: true,
        [styles.triviaQuizQuestionFinal]: true,
    })
    const showResultAnim = useSpring({
        opacity: quizComplete ? 1 : 0,
        config: { tension: 400, friction: 30, }
    })

    return (
        <div id="triviaMainParent" className={contentStyling}>
            <div className={loadingStyling}>
                <Loading loadingText={"Generating trivia questions..."} />
            </div>

            <div className={sharedStyles.errorParent}>
                <Error showError={showError} />
            </div>


            {!showLoading && !showError && !quizComplete &&
                <div className={styles.triviaQuizBody}>
                    <div className={styles.triviaQuizHeader}>
                        <div className={styles.triviaQuizQuestionCounter}>Question {currentQuestionIndex + 1} / 5</div>
                        <animated.div style={progressBarAnim} className={styles.triviaQuizBar}></animated.div>
                        {formatTime(timeElapsed)}
                    </div>
                    <div className={styles.triviaQuizQAParent}>
                        <div className={styles.triviaQuizQuestion}>{triviaQuestions[currentQuestionIndex].question}</div>
                        {triviaQuestions[currentQuestionIndex].answers.map((answerText, index) => {
                            return <TriviaAnswer
                                key={index}
                                index={index}
                                answerText={answerText}
                                addSelectedAnswer={addSelectedAnswer}
                                highlightedAnswerIndex={selectedAnswers[currentQuestionIndex]}
                                state={state}
                                quizComplete={false}
                            />
                        })}
                        <div className={styles.buttonParent}>

                            {/* Disable previous button if on first question */}
                            <button onClick={() => incrementIndex(false)} disabled={currentQuestionIndex === 0} type="button">
                                Previous
                            </button>

                            {/* Disable submit button if on last question but selected answers < 5 */}
                            <button onClick={() => incrementIndex(true)} disabled={currentQuestionIndex === 4 && Object.keys(selectedAnswers).length !== 5} type="button">
                                {currentQuestionIndex !== 4 ? "Next" : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            }

            {/* This code block renders after the quiz is submitted */}
            {quizComplete &&
                <animated.div style={showResultAnim} className={styles.finalResultParent}>
                    <BackToTop elementId={"triviaMainParent"} triggerAtY={200} />
                    <div className={styles.scoreAndRestart}>
                        <span onMouseEnter={() => setArrowSVG(arrowLeftBrown)} onMouseLeave={() => setArrowSVG(arrowLeftBlack)} onClick={restartQuiz} className={styles.restartQuiz}>
                            <img src={arrowSVG} width="20px" />
                            <span className={styles.restartQuizText}>Again!</span>
                        </span>

                        <span className={styles.score}>
                            {finalScore} / 5
                        </span>

                        <span className={styles.timeElapsedFinal}>
                            {formatTime(timeElapsed)}
                        </span>
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.allQuiz}>
                        {triviaQuestions.map((_, index1) => {
                            return (
                                <div key={index1} className={styles.triviaQuizQAParent}>
                                    <div className={triviaQuizQuestionFinal}>{index1 + 1}. {triviaQuestions[index1].question}</div>
                                    {triviaQuestions[index1].answers.map((answerText, index2) => {
                                        return <TriviaAnswer
                                            key={index2}
                                            index={index2}
                                            answerText={answerText}
                                            addSelectedAnswer={addSelectedAnswer}
                                            highlightedAnswerIndex={selectedAnswers[index1]}
                                            state={state}
                                            quizComplete={true}
                                            correctAnswer={triviaAnswers[index1]}
                                        />
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </animated.div>
            }
        </div>
    )
}

export default Trivia;