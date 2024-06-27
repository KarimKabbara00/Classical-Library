import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../css/homepage.module.css";
import BirthdayCard from "../components/home/BirthdayCard";

function Home(props) {

  const [composersBirthday, setComposerBirthday] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/api/birthday")
      .then(res => {
        setComposerBirthday(res.data)
      }).catch(err => {

      })


    document.getElementById("birthdayCarousel").onmousedown = function (e) { if (e.button === 1) return false; }

  }, [])

  const [visibleIndex, setVisibleIndex] = useState(0)
  function changeIndex(index) {
    setVisibleIndex(index);
    document.getElementById(index.toString()).scrollIntoView({ behavior: "smooth" });
  }


  return (
    <div className={styles.homeBody}>

      <div className={styles.secondRow}>
        <div className={styles.birthdayCarouselParent}>
          <h2>Upcoming Birthdays</h2>
          <div id="birthdayCarousel" className={styles.birthdayCarousel}>
            {composersBirthday.map((composer, index) => {
              return <BirthdayCard key={index} composer={composer} index={index} visibleIndex={visibleIndex} />
            })}
          </div>
          <div className={styles.carouselButtonParent}>
            <div className={styles.carouselButton} style={{ backgroundColor: visibleIndex === 0 ? "brown" : "darkgray" }} onClick={() => { changeIndex(0) }}></div>
            <div className={styles.carouselButton} style={{ backgroundColor: visibleIndex === 1 ? "brown" : "darkgray" }} onClick={() => { changeIndex(1) }}></div>
            <div className={styles.carouselButton} style={{ backgroundColor: visibleIndex === 2 ? "brown" : "darkgray" }} onClick={() => { changeIndex(2) }}></div>
          </div>
        </div>

        <div style={{ border: "1px solid green" }}>
          featured or something
        </div>
      </div>

    </div>
  );
}

export default Home;
