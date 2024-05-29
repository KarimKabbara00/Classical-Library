import React from "react";
import linkedIn from "../images/linkedin.svg";
import portfolio from "../images/portfolio.svg";
import github from "../images/github.svg";

function Footer() {
    return (
        <div className="footer">
            <div className="footerDetails">
                <span>&copy; Karim Kabbara 2024</span>
                <a href="https://www.linkedin.com/in/karim-kabbara/" target="_blank" rel="noopener noreferrer"><img className="footerSVG" src={linkedIn} width="25px" /></a>
                <a href="https://github.com/KarimKabbara00/Classical-Library" target="_blank" rel="noopener noreferrer"><img className="footerSVG" src={github} width="25px" /></a>
                <a href="https://karimkabbara00.github.io/" target="_blank" rel="noopener noreferrer"><img className="footerSVG" src={portfolio} width="25px" /></a>
            </div>
        </div>
    )
}

export default Footer;