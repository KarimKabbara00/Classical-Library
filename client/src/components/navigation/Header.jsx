import React, { useEffect, useState } from "react"
import styles from "../../css/navigation.module.css";
import logo from "../../images/treble.svg"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from "@react-spring/web";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import { useMediaQuery } from "@uidotdev/usehooks";
import { icon } from "@fortawesome/fontawesome-svg-core";

function Header(props) {

    const navigate = useNavigate();
    // rerender header on sign in
    useEffect(() => { }, [props.accessToken])

    // programatic media queries
    const is1280Px = useMediaQuery("only screen and (max-width : 1280px)");
    const [styling, setStyling] = useState({
        collapsedWidth: "0rem",
        expandedWidth: "0rem",
        iconSize: "0rem",
        fontSize: "0rem"
    })
    useEffect(() => {
        // go from smallest to largest
        let collapsedWidth = "";
        let expandedWidth = "";
        let iconSize = "";
        let fontSize = "";
        if (is1280Px) {
            collapsedWidth = "3rem";
            expandedWidth = "12rem";
            iconSize = "30rem";
            fontSize = "1.1rem";
        }
        else {
            collapsedWidth = "3rem";
            expandedWidth = "12rem";
            iconSize = "30rem";
            fontSize = "1rem";
        }
        setStyling({
            collapsedWidth: collapsedWidth,
            expandedWidth: expandedWidth,
            iconSize: iconSize,
            fontSize: fontSize
        })
    }, [])

    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarAnimation = useSpring({
        from: { width: showSidebar ? styling.collapsedWidth : styling.expandedWidth },
        to: { width: showSidebar ? styling.expandedWidth : styling.collapsedWidth },
        config: { tension: 200, friction: 30 },
    });

    const [profileHovered, setProfileHovered] = useState(false);
    function toggleHover() {
        setProfileHovered(prev => !prev);
    }

    return (
        <div>
            <nav className={styles.navBar}>
                <span className={styles.navTitle}>
                    <img className={styles.navTitleLogo} src={logo} alt="Treble Clef Icon" />
                    <span>Classical Library</span>
                </span>
                {!props.accessToken && <div className={styles.signIn} onClick={() => { navigate("/signIn") }}>Sign In</div>}
                {props.accessToken && <div onMouseEnter={toggleHover} onMouseLeave={toggleHover} className={styles.profileIcon}><FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#a52a2a" }} />
                    {profileHovered && <Profile logout={props.logout} />}
                </div>}
            </nav>
            <animated.div style={sidebarAnimation} onMouseEnter={() => { setShowSidebar(true) }} onMouseLeave={() => { setShowSidebar(false) }} className={styles.sidebarParent}>
                <Sidebar styling={styling} />
            </animated.div>
        </div>
    )
}

export default Header;