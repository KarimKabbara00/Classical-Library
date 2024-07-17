import React from "react";
import styles from "../../css/navigation.module.css";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";


function Sidebar(props) {

    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    function goToAllComposers() {
        navigate("/allComposers");
    }

    function goToAllWorks() {
        navigate("/allWorks");
    }

    function goToTrivia() {
        navigate("/trivia");
    }

    function goToMap() {
        navigate("/map");
    }

    function goToAbout() {
        navigate("/about");
    }

    // -------------------- Dark Mode -------------------- //
    const sidebarStyling = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={sidebarStyling} className={styles.sidebar}>
            <div onClick={goToHome}><SidebarItem styling={props.styling} text={"Home"} darkModeEnabled={props.darkModeEnabled} /></div>
            <div onClick={goToAllComposers}><SidebarItem styling={props.styling} text={"Composers"} darkModeEnabled={props.darkModeEnabled} /></div>
            <div onClick={goToAllWorks}><SidebarItem styling={props.styling} text={"Works"} darkModeEnabled={props.darkModeEnabled} /></div>
            <div onClick={goToTrivia}><SidebarItem styling={props.styling} text={"Trivia"} darkModeEnabled={props.darkModeEnabled} /></div>
            <div onClick={goToMap}><SidebarItem styling={props.styling} text={"Map"} darkModeEnabled={props.darkModeEnabled} /></div>
            <div onClick={goToAbout}><SidebarItem styling={props.styling} text={"About"} darkModeEnabled={props.darkModeEnabled} /></div>
            <div className={styles.placeDarkmodeBottom}><SidebarItem toggleDarkMode={props.toggleDarkMode} styling={props.styling} text={"Dark Mode"} darkModeEnabled={props.darkModeEnabled} /></div>
        </div>
    )
}

export default Sidebar;