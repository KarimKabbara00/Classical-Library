import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import styles from "../../css/navigation.module.css";
import homeBrown from "../../images/sidebar/home-brown.svg";
import homeWhite from "../../images/sidebar/home-white.svg";
import composerBrown from "../../images/sidebar/composer-brown.svg";
import composerWhite from "../../images/sidebar/composer-white.svg";
import worksBrown from "../../images/sidebar/works-brown.svg";
import worksWhite from "../../images/sidebar/works-white.svg";
import triviaBrown from "../../images/sidebar/trivia-brown.svg";
import triviaWhite from "../../images/sidebar/trivia-white.svg";
import mapBrown from "../../images/sidebar/map-brown.svg";
import mapWhite from "../../images/sidebar/map-white.svg";
import aboutBrown from "../../images/sidebar/about-brown.svg";
import aboutWhite from "../../images/sidebar/about-white.svg";
import moon from "../../images/sidebar/moon.svg";
import Switch from "react-switch";

function SidebarItem(props) {

    const [isHovered, setIsHovered] = useState(false);
    function toggleHovered() {
        setIsHovered(prev => !prev);
        props.text === "Home" ? (!isHovered ? setIcon(homeWhite) : setIcon(homeBrown)) : void (0);
        props.text === "Composers" ? (!isHovered ? setIcon(composerWhite) : setIcon(composerBrown)) : void (0);
        props.text === "Browse Works" ? (!isHovered ? setIcon(worksWhite) : setIcon(worksBrown)) : void (0);
        props.text === "Trivia" ? (!isHovered ? setIcon(triviaWhite) : setIcon(triviaBrown)) : void (0);
        props.text === "Map" ? (!isHovered ? setIcon(mapWhite) : setIcon(mapBrown)) : void (0);
        props.text === "About" ? (!isHovered ? setIcon(aboutWhite) : setIcon(aboutBrown)) : void (0);
    }

    const [icon, setIcon] = useState()
    useEffect(() => {
        props.text === "Home" ? setIcon(homeBrown) : void (0);
        props.text === "Composers" ? setIcon(composerBrown) : void (0);
        props.text === "Browse Works" ? setIcon(worksBrown) : void (0);
        props.text === "Trivia" ? setIcon(triviaBrown) : void (0);
        props.text === "Map" ? setIcon(mapBrown) : void (0);
        props.text === "About" ? setIcon(aboutBrown) : void (0);
        props.text === "Dark Mode" ? setIcon(moon) : void (0);
    }, [props.text])

    const [checked, setChecked] = useState(false);
    function toggleChecked() {
        setChecked(prev => !prev);
    }

    // resize dark mode switch
    const is1280Px = useMediaQuery("only screen and (max-width : 1280px)");

    return (
        <div>
            {props.text !== "Dark Mode" && <div  onMouseEnter={toggleHovered} onMouseLeave={toggleHovered} className={styles.sidebarItem}>
                <img src={icon} width={props.styling.iconSize} />
                <div className={styles.sidebarText}
                    style={{
                        color: isHovered ? "white" : "black",
                        fontSize: props.styling.fontSize
                    }}>
                    {props.text}
                </div>
            </div>}

            {props.text === "Dark Mode" && <div onMouseEnter={toggleHovered} onMouseLeave={toggleHovered} className={styles.darkModeItem} >
                <img src={icon} width={props.styling.iconSize} />
                <div className={styles.sidebarText}
                    style={{
                        fontSize: "1rem"//props.styling.fontSize
                    }}>
                    {props.text}
                </div>
                <div className={styles.darkModeSwitch}><Switch onChange={toggleChecked} checked={checked} onColor="#a52a2a" uncheckedIcon={null} checkedIcon={null} handleDiameter={is1280Px ? 12 : 26} height={is1280Px ? 14 : 28} width={is1280Px ? 28 : 56} /></div>
            </div>}
        </div>

    )
}

export default SidebarItem;