import React from "react"
import "../css/main.css"
import logo from "../images/treble.svg"
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();
    function goToHome() {
        navigate("/")
    }

    function goToAbout() {
        navigate("/about")
    }

    return (
        <div>
            <nav className="navBar">
                <span className="navTitle">
                    <img src={logo} width="50px" alt="Treble Clef Icon" />
                    <span>Classical Library</span>
                </span>
                <span className="navButtons">
                    <span onClick={goToHome} className="navButton">Home</span>
                    <span onClick={goToAbout} className="navButton">About</span>
                </span>
            </nav>
        </div>
    )
}

export default Header;