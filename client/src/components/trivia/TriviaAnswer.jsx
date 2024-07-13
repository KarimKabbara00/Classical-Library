import React from "react";
import styles from "../../css/trivia.module.css";
import classNames from "classnames";
import { useSpring, animated } from "@react-spring/web";

function TriviaAnswer(props) {

    // used when taking quiz 
    const selectStyling = useSpring({
        backgroundColor: props.highlightedAnswerIndex === props.index ? "brown" : "white",
        color: props.highlightedAnswerIndex === props.index ? "white" : "black",
        border: "1px solid black",
        cursor: "pointer",
        config: { duration: 50 }
    })

    // used when quiz complete
    const completeSelectStyling = {
        backgroundColor: props.answerText === props.correctAnswer ? "green" :
            props.highlightedAnswerIndex === props.index ? "brown" : "white", // this line evaluates when not the right answer

        color: props.answerText === props.correctAnswer ? "white" :
            props.highlightedAnswerIndex === props.index ? "white" : "black", // this line evaluates when not the right answer

        border: "1px solid black",
        cursor: "default"
    }

    const triviaQuizAnswerFinal = classNames({
        [styles.triviaQuizAnswer]: true,
        [styles.triviaQuizAnswerFinal]: props.quizComplete,
    })

    function handleClick() {
        // quizComplete is true when displaying final result
        if (props.quizComplete === false) {
            props.addSelectedAnswer(props.index)
        }
    }

    return (
        // id is set to props.state to force a rerender on click
        <animated.div id={props.state} onClick={handleClick} className={triviaQuizAnswerFinal} style={props.quizComplete ? completeSelectStyling : selectStyling}>
            <span>{props.answerText}</span>
        </animated.div >
    )
}

export default TriviaAnswer;