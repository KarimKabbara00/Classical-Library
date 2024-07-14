import React, { useEffect, useState } from "react";
import styles from "../../css/loading.module.css";
import eighthNoteDark from "../../images/8thNoteDark.svg";
import eighthNoteLight from "../../images/8thNoteLight.svg";
import { animated, useSprings } from "@react-spring/web";

function Loading(props) {

  // -------------------- Dark Mode -------------------- //
  const loadingTextDarkMode = {
    color: props.darkModeEnabled ? "#e8e6e3" : ""
  }
  const [SVG, setSVG] = useState(eighthNoteDark)
  useEffect(() => {
    props.darkModeEnabled ? setSVG(eighthNoteLight) : setSVG(eighthNoteDark)
  }, [props.darkModeEnabled])
  // -------------------- Dark Mode -------------------- //

  const notes = [SVG, SVG, SVG];
  const [noteToggle, setNoteToggle] = useState(false);

  const animateUp = { tension: 200, friction: 20 };
  const animateDown = { tension: 170, friction: 26 };

  const anims = useSprings(
    notes.length,
    notes.map((_, i) => ({
      to: { transform: noteToggle ? "translateY(0%)" : "translateY(-50%)" },
      from: { transform: "translateY(0%)" },
      config: noteToggle ? animateUp : animateDown,
      delay: i * 200,
    }))
  );

  useEffect(() => {
    var interval = setInterval(() => {
      setNoteToggle((prev) => !prev);
    }, 500);
    return () => clearInterval(interval); // free memory on unmount
  }, []);



  return (
    <div className={styles.loading}>
      <span id="loadingTitle" style={loadingTextDarkMode} className={styles.loadingTitle}>
        {props.loadingText}
      </span>
      <div className={styles.loadingGraphic}>
        <animated.img style={{ ...anims[0] }} id="note1" src={SVG} width="50px" />
        <animated.img style={{ ...anims[1] }} id="note2" src={SVG} width="50px" />
        <animated.img style={{ ...anims[2] }} id="note3" src={SVG} width="50px" />
      </div>
    </div>
  );
}

export default Loading;
