import React, { useEffect, useState } from "react"
import styles from "../../css/navigation.module.css";
import logo from "../../images/treble.svg"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from "@react-spring/web";
import Sidebar from "./Sidebar";
import Profile from "./Profile";


function Header(props) {

    useEffect(() => { }, [props.accessToken])

    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarAnimation = useSpring({
        from: { width: showSidebar ? "3.25vw" : "14vw" },
        to: { width: showSidebar ? "14vw" : "3.25vw" },
        config: { tension: 200, friction: 30 },
    });

    const [profileHovered, setProfileHovered] = useState(false);
    function toggleHover() {
        setProfileHovered(prev => !prev);
    }

    return (
        <div style={{ height: "100%" }}>
            <nav className={styles.navBar}>
                <span className={styles.navTitle}>
                    <img src={logo} width="50px" alt="Treble Clef Icon" />
                    <span>Classical Library</span>
                </span>
                {!props.accessToken && <div className={styles.signIn} onClick={() => { navigate("/signIn") }}>Sign In</div>}
                {props.accessToken && <div onMouseEnter={toggleHover} onMouseLeave={toggleHover} className={styles.profileIcon}><FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#a52a2a" }} />
                    {profileHovered && <Profile logout={props.logout} />}
                </div>}
            </nav>
            <animated.div style={sidebarAnimation} onMouseEnter={() => { setShowSidebar(true) }} onMouseLeave={() => { setShowSidebar(false) }} className={styles.sidebarParent}>
                <Sidebar />
            </animated.div>
        </div>
    )
}

export default Header;