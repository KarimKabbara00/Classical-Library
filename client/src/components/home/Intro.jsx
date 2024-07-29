import React from "react";
import styles from "../../css/homepage.module.css";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

function Intro(props) {

    // const titleAnim = useSpring({
    //     from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
    //     to: { transform: "translateY(0%)" },
    //     config: { tension: 200, friction: 30 },
    //     delay: 0
    // });

    // const descLineOneAnim = useSpring({
    //     from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
    //     to: { transform: "translateY(0%)" },
    //     config: { tension: 200, friction: 30 },
    //     delay: 400
    // });

    // const descLineTwoAnim = useSpring({
    //     from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
    //     to: { transform: "translateY(0%)" },
    //     config: { tension: 200, friction: 30 },
    //     delay: 800
    // });

    // const descLineThreeAnim = useSpring({
    //     from: { transform: props.firstLoad ? "translateY(-5000%)" : "translateY(0%)" },
    //     to: { transform: "translateY(0%)" },
    //     config: { tension: 200, friction: 30 },
    //     delay: 1200
    // });

    const navigate = useNavigate();
    function goToComposers() {
        navigate("/allComposers")
    }

    function goToWorks() {
        navigate("/allWorks");
    }

    function goToMap() {
        navigate("/map");
    }

    function goToTrivia() {
        navigate("/trivia");
    }

    function goToPlaylists() {
        navigate("/profile/playlists")
    }

    return (
        <div style={{ width: "100%" }}>
            <animated.div className={styles.title}> {/* style={titleAnim} */}
                <h1>Welcome to the <span className={styles.featureHighlightTitle}>Classical Library</span></h1>
            </animated.div>
            <div className={styles.websiteDesc}>
                <animated.span>Dive into a world of over <span onClick={goToComposers} className={styles.featureHighlight}>200 classical composers</span> and more {/* style={descLineOneAnim} */}
                    than <span onClick={goToWorks} className={styles.featureHighlight}>25,000 timeless works</span>. {/* 24975 */}
                </animated.span>
                <animated.span>Learn about the lives and legacies of composers. Explore birth locations on our <span onClick={goToMap} className={styles.featureHighlight}>interactive map</span>, challenge {/* style={descLineTwoAnim} */}
                    yourself with fun <span onClick={goToTrivia} className={styles.featureHighlight}>trivia questions</span>, or create personalized <span onClick={goToPlaylists} className={styles.featureHighlight}>playlists</span> to enjoy your favorite pieces.
                </animated.span>
                <animated.span>Dive right in!</animated.span> {/* style={descLineThreeAnim} */}
            </div>
        </div>
    )
}

export default Intro;