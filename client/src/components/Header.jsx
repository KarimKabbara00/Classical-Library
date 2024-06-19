import React from "react"
import styles from "../css/main.module.css"
import logo from "../images/treble.svg"
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    function goToSignIn() {
        navigate("/signIn");
    }

    function goToHome() {
        navigate("/");
    }

    function goToMap() {
        navigate("/map");
    }

    function goToAbout() {
        navigate("/about");
    }
    return (
        <div>
            <nav className={styles.navBar}>
                <span className={styles.navTitle}>
                    <img src={logo} width="50px" alt="Treble Clef Icon" />
                    <span>Classical Library</span>
                </span>
                <span className={styles.navButtons}>
                    <span onClick={goToSignIn} className={styles.navButton}>Sign In</span>
                    <span onClick={goToHome} className={styles.navButton}>Home</span>
                    <span onClick={goToMap} className={styles.navButton}>Map</span>
                    <span onClick={goToAbout} className={styles.navButton}>About</span>
                </span>
            </nav>
        </div>
    )
}

export default Header;