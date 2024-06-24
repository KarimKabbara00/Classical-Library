import React from "react";
import styles from "../../css/navigation.module.css";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";


function Sidebar() {

    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    function goToMap() {
        navigate("/map");
    }

    function goToAllComposers() {
        navigate("/allComposers");
    }

    function goToAllWorks() {
        return;
    }

    function goToAbout() {
        navigate("/about");
    }

    function setDarkmode() {
        return
    }

    return (
        <div className={styles.sidebar}>
            <div onClick={goToHome}><SidebarItem text={"Home"} /></div>
            <div onClick={goToAllComposers}><SidebarItem text={"Composers"} /></div>
            <div onClick={goToAllWorks}><SidebarItem text={"Works"} /></div>
            <div onClick={goToMap}><SidebarItem text={"Map"} /></div>
            <div onClick={goToAbout} style={{ flexGrow: "1" }}><SidebarItem text={"About"} /></div> {/* Flex grow to shove darkmode to bottom */}
            <div onClick={setDarkmode}><SidebarItem text={"Dark Mode"} /></div>
        </div>
    )
}

export default Sidebar;