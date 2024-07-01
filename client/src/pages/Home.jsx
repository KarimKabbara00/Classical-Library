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

  return (
    <div className={styles.homeBody}>

      <div className={styles.firstRow}>
        <Intro firstLoad={props.firstLoad} />
      </div>

      <animated.div style={fadeCarouselAnim} className={styles.secondRow}>
        <BirthdayCarousel
          audioObject={props.audioObject}
          setAudioObject={props.setAudioObject}
          currentSong={props.currentSong}
          setCurrentSong={props.setCurrentSong}
          showOrHideMusicPlayer={props.showOrHideMusicPlayer} />
        <QOTD />
      </animated.div>

    </div>
  );
}

export default Home;
