import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "../css/homepage.module.css";
import Intro from "../components/home/Intro";
import BirthdayCarousel from "../components/home/BirthdayCarousel";
import QOTD from "../components/home/QOTD";

function Home(props) {

  const fadeCarouselAnim = useSpring({
    from: { opacity: props.firstLoad ? 0 : 1 },
    to: { opacity: 1 },
    config: { tension: 200, friction: 30 },
    delay: 1800
  });

  // -------------------- Dark Mode -------------------- //
  const homeBodyDarkMode = {
    backgroundColor: props.darkModeEnabled ? "#242728" : "",
    color: props.darkModeEnabled ? "#e8e6e3" : ""
  }

  const secondRowDarkMode = {
    backgroundColor: props.darkModeEnabled ? "#181a1b" : "",
    color: props.darkModeEnabled ? "#e8e6e3" : ""
  }

  // merge useSpring and dark mode
  const secondRowStyling = {
    ...secondRowDarkMode,
    ...fadeCarouselAnim
  }
  // -------------------- Dark Mode -------------------- //

  return (
    <div style={homeBodyDarkMode} className={styles.homeBody}>

      <div className={styles.firstRow}>
        <Intro firstLoad={props.firstLoad} darkModeEnabled={props.darkModeEnabled} />
      </div>

      <animated.div style={secondRowStyling} className={styles.secondRow}>
        <BirthdayCarousel darkModeEnabled={props.darkModeEnabled} fetchAudio={props.fetchAudio} />
        <QOTD darkModeEnabled={props.darkModeEnabled} />
      </animated.div>

    </div>
  );
}

export default Home;
