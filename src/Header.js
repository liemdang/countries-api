import React, { useState } from 'react'
import { IoMoonOutline, IoMoon } from 'react-icons/io5'
import "./Header.css"
import { Link } from "react-router-dom"


const Header = () => {
    const [darkMode, setDarkMode] = useState(false)
    function changeTheme() {
        setDarkMode(darkMode === false ? true : false)
    }
    const modeIcon = darkMode ? <IoMoonOutline /> : <IoMoon />
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
