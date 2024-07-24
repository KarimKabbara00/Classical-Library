import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import styles from "../../css/musicPlayerDocked.module.css";

function DockedUpNext(props) {

    const upNextAnim = useSpring({
        from: { transform: !props.showUpNextBox ? "translate(-27%, -110%)" : "translate(200%, -110%)" },
        to: { transform: !props.showUpNextBox ? "translate(200%, -110%)" : "translate(-27%, -110%)" },
        config: { tension: 200, friction: 30 },
    });

    const darkMode = {
        backgroundColor: props.darkModeEnabled ? "#181a1b" : ""
    }

    useEffect(() => {
        document.getElementById("nextUp").scrollTo(0, 0);
    }, [props.showUpNextBox])

    return (
        <animated.div id="nextUp" className={styles.UpNext} style={{ ...upNextAnim, ...darkMode }} >
            <div className={styles.upNextTitleWrapper} style={darkMode}>
                <h3>Up Next</h3>
            </div>
            <div className={styles.upNextContent}>
                {props.upNext.slice(props.playlistQueueIndex + 1).map((work, index) => {
                    return <div key={index} className={styles.queuedSong}>{work.title}</div>
                })}
            </div>

        </animated.div>
    )
}

export default DockedUpNext;