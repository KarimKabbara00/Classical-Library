import React from "react";
import styles from "../../css/homepage.module.css";
import { useSpring, animated } from "@react-spring/web";

function Intro(props) {

    const titleAnim = useSpring({
        from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
        to: { transform: "translateY(0%)" },
        config: { tension: 200, friction: 30 },
        delay: 0
    });

    const descLineOneAnim = useSpring({
        from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
        to: { transform: "translateY(0%)" },
        config: { tension: 200, friction: 30 },
        delay: 400
    });

    const descLineTwoAnim = useSpring({
        from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
        to: { transform: "translateY(0%)" },
        config: { tension: 200, friction: 30 },
        delay: 800
    });

    const descLineThreeAnim = useSpring({
        from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
        to: { transform: "translateY(0%)" },
        config: { tension: 200, friction: 30 },
        delay: 1200
    });

    return (
        <div>
            <animated.div style={titleAnim} className={styles.title}>
                <h1>Welcome to the <span className={styles.featureHighlight}>Classical Library</span></h1>
            </animated.div>
            <div className={styles.websiteDesc}>
                <animated.span style={descLineOneAnim} >Dive into a world of over <span className={styles.featureHighlight}>200 classical composers</span> and more
                    than <span className={styles.featureHighlight}>24,000 timeless works</span>. {/* 24975 */}
                </animated.span>
                <animated.span style={descLineTwoAnim}>Explore birth locations on our <span className={styles.featureHighlight}>interactive map</span>, challenge
                    yourself with fun <span className={styles.featureHighlight}>trivia questions</span>, <br /> or create personalized <span className={styles.featureHighlight}>playlists</span> to enjoy your favorite pieces.
                </animated.span>
                <animated.span style={descLineThreeAnim}>Dive right in!</animated.span>
            </div>
        </div>
    )
}

export default Intro;