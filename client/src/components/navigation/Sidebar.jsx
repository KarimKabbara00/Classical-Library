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
        return;
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

    function setDarkmode() {
        return
    }

    return (
        <div className={styles.sidebar}>
            <div onClick={goToHome}><SidebarItem styling={props.styling} text={"Home"} /></div>
            <div onClick={goToAllComposers}><SidebarItem styling={props.styling} text={"Composers"} /></div>
            <div onClick={goToAllWorks}><SidebarItem styling={props.styling} text={"Browse Works"} /></div>
            <div onClick={goToTrivia}><SidebarItem styling={props.styling} text={"Trivia"} /></div>
            <div onClick={goToMap}><SidebarItem styling={props.styling} text={"Map"} /></div>
            <div onClick={goToAbout}><SidebarItem styling={props.styling} text={"About"} /></div>
            <div className={styles.placeDarkmodeBottom} onClick={setDarkmode}><SidebarItem styling={props.styling} text={"Dark Mode"} /></div>
        </div>
    )
}

export default Sidebar;