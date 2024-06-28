import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/homepage.module.css";
import BirthdayCard from "../../components/home/BirthdayComposerCard";

function BirthdayCarousel() {

    const [composersBirthday, setComposerBirthday] = useState([])
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3001/api/birthday")
            .then(res => {
                setComposerBirthday(res.data)
            }).catch(err => {
                console.log(err)
                setShowError(true);
            })
        document.getElementById("birthdayCarousel").onmousedown = function (e) { if (e.button === 1) return false; }
    }, [])

    const [visibleIndex, setVisibleIndex] = useState(0)
    function changeIndex(index) {
        setVisibleIndex(index);
        document.getElementById(index.toString()).scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className={styles.birthdayCarouselParent}>
            <h1>Upcoming Birthdays</h1>
            {!showError && <div>
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
            </div>}
            {showError && <div id="birthdayCarousel">## Error fetching data ##</div>}
        </div>
    )
}

export default BirthdayCarousel;