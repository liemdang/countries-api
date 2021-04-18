import React, { useState } from 'react'
import { IoMoonOutline, IoMoon } from 'react-icons/io5'
import "./Header.css"
import "./App.css"
import { Link } from "react-router-dom"
import { FiSun } from "react-icons/fi"

const Header = () => {
    const [darkMode, setDarkMode] = useState(false)
    function changeTheme() {
        setDarkMode(darkMode === false ? true : false)
        document.body.classList.toggle("dark-theme");
    }
    const modeIcon = darkMode ? <FiSun /> : <IoMoonOutline />
    const modeText = darkMode ? "Light" : "Dark"
    return (
        <div className="header">
            <Link to="/" className="header__brand">
                <h2>Where in the world?</h2>
            </Link>
            <div className="header__theme" onClick={changeTheme}><span className="header__icon">{modeIcon}</span><p>{modeText} Mode</p></div>
        </div>
    )
}

export default Header
