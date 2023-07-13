import React from "react";
import './Navbar.css'
import {NavLink} from "react-router-dom";


export default function Navbar() {
    return (
        <>
            <nav className= "nav-head-container">
                <div className="header-container">
                    <h1 className="brand-name">soul sounds</h1>
                    <p className="subtitle">what is your favorite tune?</p>
                </div>
                <div className="nav-links-container">
                    <NavLink to="/"><p>home</p></NavLink>
                    <NavLink to="/about-us"><p>about us</p></NavLink>
                    <NavLink to="/our-sounds"><p>our sounds</p></NavLink>
                    <NavLink to="/search"><p>search</p></NavLink>
                    <NavLink to="/my-sounds"><p>my sounds</p></NavLink>
                </div>
            </nav>
        </>
    )
}

