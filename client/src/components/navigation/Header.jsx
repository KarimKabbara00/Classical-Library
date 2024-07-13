import React, { useEffect, useState } from "react"
import styles from "../../css/navigation.module.css";
import logo from "../../images/treble.svg"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from "@react-spring/web";
import Sidebar from "./Sidebar";
import ProfileBox from "./ProfileBox";
import { useMediaQuery } from "@uidotdev/usehooks";

function Header(props) {

    const navigate = useNavigate();
    // rerender header on sign in
    useEffect(() => { }, [props.sessionData])

    // programatic media queries
    const is1280Px = useMediaQuery("only screen and (max-width : 1280px)");
    const [styling, setStyling] = useState({
        sidebarHeight: "0rem",
        collapsedWidth: "0rem",
        expandedWidth: "0rem",
        iconSize: "0rem",
        fontSize: "0rem",
        profileIconSize: "xl"
    })
    useEffect(() => {

        // define styles that must change based on max-width
        let sidebarHeight = "";
        let collapsedWidth = "";
        let expandedWidth = "";
        let iconSize = "";
        let fontSize = "";
        let profileIconSize = "";

        // go from smallest to largest
        if (is1280Px) {
            sidebarHeight = "92vh"
            collapsedWidth = "3rem";
            expandedWidth = "12rem";
            iconSize = "30rem";
            fontSize = "1.1rem";
            profileIconSize = "lg";
        }
        else {
            sidebarHeight = "94vh"
            collapsedWidth = "4rem";
            expandedWidth = "15rem";
            iconSize = "40rem";
            fontSize = "1.25rem";
            profileIconSize = "xl";
        }
        setStyling({
            sidebarHeight: sidebarHeight,
            collapsedWidth: collapsedWidth,
            expandedWidth: expandedWidth,
            iconSize: iconSize,
            fontSize: fontSize,
            profileIconSize: profileIconSize
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
                {!props.sessionData && <div className={styles.signIn} onClick={() => { navigate("/signIn") }}>Sign In</div>}
                {props.sessionData && <div onMouseEnter={toggleHover} onMouseLeave={toggleHover} className={styles.profileIcon}><FontAwesomeIcon icon={faUser} size={styling.profileIconSize} style={{ color: "#a52a2a" }} />
                    {profileHovered && <ProfileBox logout={props.logout} />}
                </div>}
            </nav>
            <animated.div style={{ ...sidebarAnimation, height: styling.sidebarHeight }} onMouseEnter={() => { setShowSidebar(true) }} onMouseLeave={() => { setShowSidebar(false) }} className={styles.sidebarParent}>
                <Sidebar styling={styling} toggleDarkMode={props.toggleDarkMode} darkModeEnabled={props.darkModeEnabled} />
            </animated.div>
        </div>
    )
}

export default Header;