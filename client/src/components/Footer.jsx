import React from "react";
import linkedIn from "../images/linkedin.svg";
import portfolio from "../images/portfolio.svg";
import github from "../images/github.svg";
import styles from "../css/main.module.css"

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerDetails}>
                <span>&copy; Karim Kabbara 2024</span>
                <a href="https://www.linkedin.com/in/karim-kabbara/" target="_blank" rel="noopener noreferrer"><img alt="linkedIn" className={styles.footerSVG} src={linkedIn} width="25px" /></a>
                <a href="https://github.com/KarimKabbara00/Classical-Library" target="_blank" rel="noopener noreferrer"><img alt="github" className={styles.footerSVG} src={github} width="25px" /></a>
                <a href="https://karimkabbara00.github.io/" target="_blank" rel="noopener noreferrer"><img alt="portfolio" className={styles.footerSVG} src={portfolio} width="25px" /></a>
            </div>
        </div>
    )
}

export default Footer;