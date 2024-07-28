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
    // This useEffect is used for post Google OAuth authentication landing.

    const url = new URL(window.location.href);  // current url
    const from = url.searchParams.get("from");  // from OAuth or email
    const newUrl = "http://localhost:3000/"     // finally, set to this

    if (!from)
      return;

    try {
      const hash = url.hash; // get after #
      const accessToken = hash.split("#access_token=")[1].split("&expires_at")[0];
      const refreshToken = hash.split("&refresh_token=")[1].split("&token_type")[0];
      window.history.pushState({ path: newUrl }, '', newUrl);

      if (!accessToken || !refreshToken || !from)
        throw "ERROR WITH ACCESS TOKEN OR REFRESH TOKEN OR FROM"

      axios.post("http://localhost:3001/api/postAuthAutoSignIn", { from: from }, {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': `Bearer ${accessToken}`,
          'refreshToken': refreshToken
        },
      }).then(res => {
        props.setAccessToken(accessToken);
        props.setRefreshToken(refreshToken);
        props.setUsername(res.data.name);
        props.setEmail(res.data.email);
        props.setIsGoogleAuth(from === "google");
        const stateText = from === "google" ? " with Google." : "."
        toast.success(`Signed in${stateText}`);
        navigate("/");
      }).catch(err => {
        console.log(err);
        const stateText = from === "google" ? " with Google." : "."
        toast.error(`Error signing in${stateText}`);
      });
    }
    catch (e) {
      console.log(e)
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
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
