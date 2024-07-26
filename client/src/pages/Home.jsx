import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "../css/homepage.module.css";
import Intro from "../components/home/Intro";
import BirthdayCarousel from "../components/home/BirthdayCarousel";
import QOTD from "../components/home/QOTD";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home(props) {

  const navigate = useNavigate();
  useEffect(() => {
    try {
      let accessToken = window.location.href.split("/#access_token=")[1].split("&expires_at")[0];
      let refreshToken = window.location.href.split("&refresh_token=")[1].split("&token_type")[0];
      let newUrl = "http://localhost:3000/"
      window.history.pushState({ path: newUrl }, '', newUrl);

      props.setAccessToken(accessToken);
      axios.post("http://localhost:3001/api/auth/googleAuthSignIn", {}, {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': `Bearer ${accessToken}`,
          'refreshToken': refreshToken
        },
      }).then(res => {
        props.setUsername(res.data);
        toast.success("Signed in with Google.");
        navigate("/");
      }).catch(err => {
        console.log(err);
        toast.error("Error Signing in with Google.");
      });
    }
    catch { }
  }, []);

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
        <BirthdayCarousel darkModeEnabled={props.darkModeEnabled} fetchAudio={props.fetchAudio} audioObject={props.audioObject} setAnotherRequest={props.setAnotherRequest} />
        <QOTD darkModeEnabled={props.darkModeEnabled} />
      </animated.div>

    </div>
  );
}

export default Home;
