import React from "react";
import styles from "../../css/trivia.module.css";
import { useSpring, animated } from "@react-spring/web";

function TriviaAnswer(props) {

    const selectStyling = useSpring({
        backgroundColor: props.selected == props.index ? "brown" : "white",
        color: props.selected == props.index ? "white" : "black",
        border: "1px solid black",
        config: { duration: 50 }
    })

    return (
        <animated.div className={styles.triviaQuizAnswer} style={selectStyling}>
            <input onChange={props.handleAction} value={props.index} selected={props.selected === props.index} type="radio" name="answerChoice" />
            <span>{props.answer}</span>
        </animated.div>
    )
}

export default TriviaAnswer;