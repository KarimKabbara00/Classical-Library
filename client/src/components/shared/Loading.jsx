import React, { useEffect, useState } from "react";
import styles from "../../css/loading.module.css";
import eighthNote from "../../images/8thNote.svg";
import { animated, useSprings } from "@react-spring/web";

function Loading(props) {
  const notes = [eighthNote, eighthNote, eighthNote];
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
      <span id="loadingTitle" className={styles.loadingTitle}>
        {props.loadingText}
      </span>
      <div className={styles.loadingGraphic}>
        <animated.img style={{ ...anims[0] }} id="note1" src={eighthNote} width="50px" />
        <animated.img style={{ ...anims[1] }} id="note2" src={eighthNote} width="50px" />
        <animated.img style={{ ...anims[2] }} id="note3" src={eighthNote} width="50px" />
      </div>
    </div>
  );
}

export default Loading;
