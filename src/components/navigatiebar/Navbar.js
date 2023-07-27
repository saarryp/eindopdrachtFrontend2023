import React from "react";
import './Navbar.css'
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="nav-head-container">
                <div className="header-container">
                    <h1 className="brand-name">soul sounds</h1>
                    <p className="subtitle">what is your favorite tune?</p>
                </div>
                <div className="nav-links-container">
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                    <NavLink to="/about-us" activeClassName="active">About Us</NavLink>
                    <NavLink to="/our-sounds" activeClassName="active">Our Sounds</NavLink>
                    <NavLink to="/search" activeClassName="active">Search</NavLink>
                    <NavLink to="/my-sounds" activeClassName="active">My Sounds</NavLink>
                </div>
            </nav>
        </>
    )
}
