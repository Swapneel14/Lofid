import React from "react";
import "../css/Navbar.css"
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar">

                <div className="logo">
                    Campus Lost & Found
                </div>
                {/* Search - Bar */}
                <div className="search-container">

                    <input
                        type="text"
                        placeholder="Search items..."
                        className="search-input"
                    />

                    <button className="search-btn">
                        🔍
                    </button>
                </div>

                <ul className="nav-links mt-3">

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/register" className="register-btn">
                            Register
                        </Link>
                    </li>

                </ul>

            </nav>
        </>
    );
}

export default Navbar;