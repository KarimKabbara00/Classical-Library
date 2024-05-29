import React from "react"
import "../css/main.css"
import logo from "../images/treble.svg"

function Header() {
    return (
        <nav className="navBar">
            <span className="navTitle">
                <img src = {logo} width="50px" alt="Treble Clef Icon"/>
                <span>Classical Library</span>
            </span>
            <span className="navButtons">
                <a href="/" className="navButton">Home</a>
                <a href="/about" className="navButton">About</a>
            </span>
        </nav>
    ) 
}

export default Header;