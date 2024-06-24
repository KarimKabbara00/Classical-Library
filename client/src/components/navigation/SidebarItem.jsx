import React, { useEffect, useState } from "react";
import styles from "../../css/navigation.module.css";
import homeBrown from "../../images/sidebar/home-brown.svg";
import homeWhite from "../../images/sidebar/home-white.svg";
import mapBrown from "../../images/sidebar/map-brown.svg";
import mapWhite from "../../images/sidebar/map-white.svg";
import composerBrown from "../../images/sidebar/composer-brown.svg";
import composerWhite from "../../images/sidebar/composer-white.svg";
import worksBrown from "../../images/sidebar/works-brown.svg";
import worksWhite from "../../images/sidebar/works-white.svg";
import aboutBrown from "../../images/sidebar/about-brown.svg";
import aboutWhite from "../../images/sidebar/about-white.svg";
import moon from "../../images/sidebar/moon.svg";
import Switch from "react-switch";

function SidebarItem(props) {

    const [isHovered, setIsHovered] = useState(false);
    function toggleHovered() {
        setIsHovered(prev => !prev);
        props.text === "Map" ? (!isHovered ? setIcon(mapWhite) : setIcon(mapBrown)) : void (0);
        props.text === "Home" ? (!isHovered ? setIcon(homeWhite) : setIcon(homeBrown)) : void (0);
        props.text === "Composers" ? (!isHovered ? setIcon(composerWhite) : setIcon(composerBrown)) : void (0);
        props.text === "Works" ? (!isHovered ? setIcon(worksWhite) : setIcon(worksBrown)) : void (0);
        props.text === "About" ? (!isHovered ? setIcon(aboutWhite) : setIcon(aboutBrown)) : void (0);
    }

    const [icon, setIcon] = useState()
    useEffect(() => {
        props.text === "Home" ? setIcon(homeBrown) : void (0);
        props.text === "Map" ? setIcon(mapBrown) : void (0);
        props.text === "Composers" ? setIcon(composerBrown) : void (0);
        props.text === "Works" ? setIcon(worksBrown) : void (0);
        props.text === "About" ? setIcon(aboutBrown) : void (0);
        props.text === "Dark Mode" ? setIcon(moon) : void (0);
    }, [props.text])

    const label = { inputProps: { 'aria-label': 'Dark Mode' } };

    const [checked, setChecked] = useState(false);
    function toggleChecked() {
        setChecked(prev => !prev);
    }

    return (
        <div>
            {props.text !== "Dark Mode" && <div onMouseEnter={toggleHovered} onMouseLeave={toggleHovered} className={styles.sidebarItem}>
                <div className={styles.sidebarIcon}><img src={icon} width="40px" /></div>
                <div className={styles.sidebarText} style={{ color: isHovered ? "white" : "black" }}>{props.text}</div>
            </div>}
            {props.text === "Dark Mode" && <div onMouseEnter={toggleHovered} onMouseLeave={toggleHovered} className={styles.darkmode} >
                <div className={styles.sidebarIcon}><img src={icon} width="40px" /></div>
                <div className={styles.sidebarText}>{props.text}</div>
                <Switch onChange={toggleChecked} checked={checked} onColor="#a52a2a" uncheckedIcon={null} checkedIcon={null} height={28} handleDiameter={22} />
            </div>}
        </div>

    )
}

export default SidebarItem;