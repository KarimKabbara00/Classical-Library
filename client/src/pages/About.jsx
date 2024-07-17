import React from "react";
import styles from "../css/about.module.css"
import AboutSection from "../components/about/AboutSection";

function About(props) {
    const aboutMeDescription = "Just a dude that likes classical music.";
    const apisUsed = (
        <ul>
            <li><span style={{ fontWeight: "bold" }}>OpenOpus: </span>classical music metadata.</li>
            <li style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}><span style={{ fontWeight: "bold" }}>ChatGPT: </span>unique composer descriptions and trivia questions.</li>
            <li><span style={{ fontWeight: "bold" }}>Google Maps: </span>interactive map for composer birth locations.</li>
        </ul>
    );
    const dataRelDescription = (
        <div className={styles.dataRelDescription}>
            <span>ChatGPT (GPT-4o) is used to: </span>
            <ol>
                <li>Fetch composer quotes for the Quotes of the Day section on the home page.</li>
                <li>Generate a description when viewing a composer.</li>
                <li>Generate trivia questions.</li>
            </ol>
            <span>Remember that generative AI can make mistakes and that the data could be inaccurate.</span>
        </div>
    )
    // -------------------- Dark Mode -------------------- //
    const mainBodyDarkModeStyle = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        color: props.darkModeEnabled ? "#e8e6e3" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={mainBodyDarkModeStyle} className={styles.mainBody}>
            <AboutSection title="About Me" description={aboutMeDescription} maxHeight="0rem" />
            <AboutSection title="API Usage" description={apisUsed} maxHeight="4.25rem" />
            <AboutSection title="Data Reliability" description={dataRelDescription} maxHeight="4.25rem" />
        </div>
    )
}


export default About;