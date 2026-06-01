import React from "react";
import "../css/Navbar.css"
import { Link } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function Navbar() {
    return (
        <>
           <nav className="navbar">

    <div className="logo">
        Campus Lost & Found
    </div>

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

    <ul className="nav-links">

        <li>
            <Link to="/">Home</Link>
        </li>

        <li>
            <Link to="/about">About</Link>
        </li>

        <li className="auth-section">
            <Show when="signed-out">
                <SignUpButton mode="modal">
                    <button className="register-btn">
                        Register
                    </button>
                </SignUpButton>
            </Show>

            <Show when="signed-in">
                <UserButton
                    appearance={{
                        elements: {
                            userButtonTrigger: "w-10 h-10",
                            userButtonAvatarBox: "w-10 h-10",
                            userButtonAvatarImage: "w-10 h-10 object-cover"
                        }
                    }}
                />
            </Show>
        </li>

    </ul>

</nav>
        </>
    );
}

export default Navbar;