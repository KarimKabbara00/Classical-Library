import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import styles from "../../css/musicPlayerDocked.module.css";

function DockedUpNext(props) {

    const upNextAnim = useSpring({
        from: { transform: !props.showUpNextBox ? "translate(-15%, -110%)" : "translate(200%, -110%)" },
        to: { transform: !props.showUpNextBox ? "translate(200%, -110%)" : "translate(-15%, -110%)" },
        config: { tension: 200, friction: 30 },
    });

    useEffect(() => {
        document.getElementById("nextUp").scrollTo(0, 0);
    }, [props.showUpNextBox])


    return (
        <animated.div id="nextUp" className={styles.UpNext} style={upNextAnim} >
            <h3 className={styles.upNextTitle}>Up Next</h3>
            <div className={styles.queuedSong}>Piano Sonata no. 14 in C sharp minor, op. 27 no. 2, "Moonlight"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 23 in F minor, op. 57, "Appassionata"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 8 in C minor, op. 13, "Pathétique"</div>
            <div className={styles.queuedSong}>2. Piano Sonata no. 10 in C major, K.330</div>
            <div className={styles.queuedSong}>Piano Sonata no. 14 in C sharp minor, op. 27 no. 2, "Moonlight"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 23 in F minor, op. 57, "Appassionata"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 8 in C minor, op. 13, "Pathétique"</div>
            <div className={styles.queuedSong}>2. Piano Sonata no. 10 in C major, K.330</div>
            <div className={styles.queuedSong}>Piano Sonata no. 14 in C sharp minor, op. 27 no. 2, "Moonlight"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 23 in F minor, op. 57, "Appassionata"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 8 in C minor, op. 13, "Pathétique"</div>
            <div className={styles.queuedSong}>2. Piano Sonata no. 10 in C major, K.330</div>
            <div className={styles.queuedSong}>Piano Sonata no. 14 in C sharp minor, op. 27 no. 2, "Moonlight"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 23 in F minor, op. 57, "Appassionata"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 8 in C minor, op. 13, "Pathétique"</div>
            <div className={styles.queuedSong}>2. Piano Sonata no. 10 in C major, K.330</div>
            <div className={styles.queuedSong}>Piano Sonata no. 14 in C sharp minor, op. 27 no. 2, "Moonlight"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 23 in F minor, op. 57, "Appassionata"</div>
            <div className={styles.queuedSong}>Piano Sonata no. 8 in C minor, op. 13, "Pathétique"</div>
            <div className={styles.queuedSong}>2. Piano Sonata no. 10 in C major, K.330</div>
        </animated.div>
    )
}

export default DockedUpNext;