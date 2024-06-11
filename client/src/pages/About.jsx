import React, { useState } from "react";
import styles from "../css/about.module.css"
import arrowRight from "../images/arrow-right.svg"
import arrowDown from "../images/arrow-down.svg"

function About() {

    const [arrow1Pressed, setArrow1Pressed] = useState(false);
    const [arrow2Pressed, setArrow2Pressed] = useState(false);
    const [arrow3Pressed, setArrow3Pressed] = useState(false);

    const [arrow1SVG, setArrow1SVG] = useState(arrowRight);
    const [arrow2SVG, setArrow2SVG] = useState(arrowRight);
    const [arrow3SVG, setArrow3SVG] = useState(arrowRight);

    const showCSS = {
        visibility: "visible",
        animation: "showSection 500ms 1",
    };

    const hideCSS = {
        visibility: "hidden",
        animation: "hideSection 500ms 1",
    };

    function changeArrowSVG(event) {
        const name = event.target.getAttribute("name");
        if (name === "aboutMe") {
            setArrow1Pressed(!arrow1Pressed);
            !arrow1Pressed ? setArrow1SVG(arrowDown) : setArrow1SVG(arrowRight);
        } else if (name === "apiUsage") {
            setArrow2Pressed(!arrow2Pressed);
            !arrow2Pressed ? setArrow2SVG(arrowDown) : setArrow2SVG(arrowRight);
        } else if (name === "dataRel") {
            setArrow3Pressed(!arrow3Pressed);
            !arrow3Pressed ? setArrow3SVG(arrowDown) : setArrow3SVG(arrowRight);
        }
    }

    return (
        <div className={styles.mainBody} style={{ height: "100vh" }}>
            <div className={styles.sectionGroup}>
                <div name="aboutMe" className={styles.sectionTitle} onClick={changeArrowSVG}>
                    <span name="aboutMe">About Me</span>
                    <img name="aboutMe" src={arrow1SVG} width="25px" alt="aboutMe" />
                </div>
                <span style={arrow1Pressed ? showCSS : hideCSS} className={styles.sectionDesc}>Just a dude that likes classical music.</span>
            </div>

            <div className={styles.sectionGroup}>
                <div name="apiUsage" className={styles.sectionTitle} onClick={changeArrowSVG}>
                    <span name="apiUsage">API Usage</span>
                    <img name="apiUsage" src={arrow2SVG} width="25px" alt="apiUsage" />
                </div>
                <span style={arrow2Pressed ? showCSS : hideCSS} className={styles.sectionDesc}>
                    <ul>
                        <li>OpenOpus</li>
                        <li>ChatGPT</li>
                        <li>Google Maps</li>
                    </ul>
                </span>
            </div>

            <div className={styles.sectionGroup}>
                <div name="dataRel" className={styles.sectionTitle} onClick={changeArrowSVG}>
                    <span name="dataRel">Data Reliability</span>
                    <img name="dataRel" src={arrow3SVG} width="25px" alt="dataRel" />
                </div>
                <span style={arrow3Pressed ? showCSS : hideCSS} className={styles.sectionDesc}>
                    OpenAI's ChatGPT is used to generate a description for any given composer. You will notice that the description will
                    differ each time the page is loaded. Please remember that generative AI can make mistakes and that the data could be inaccurate.
                </span>
            </div>
        </div>)
}


export default About;