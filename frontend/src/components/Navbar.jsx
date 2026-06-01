import React from "react";
import "../css/Navbar.css"
import { Link } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function Navbar() {
    return (
        <>
            <nav className="navbar text-2xl">

                <div className="logo text-[25px] bg-linear-to-r from-blue-400 to-indigo-900 text-white py-2 px-3.5 rounded">
                    Campus Lost & Found
                </div>
                {/* Search - Bar */}
                <div className="search-container">

                    <input
                        type="text"
                        placeholder="Search items..."
                        className="search-input text-[120px]"
                    />

                    <button className="search-btn ">
                        🔍
                    </button>
                </div>

                <ul className="nav-links mt-3 flex items-center gap-5">

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Show when="signed-out">
                            <SignUpButton mode="modal">
                                <button className="register-btn">
                                    Register
                                </button>
                            </SignUpButton>
                        </Show>
                        <Show when="signed-in">
                            <UserButton appearance={{
                                elements: {
                                    // Forces the outer button container to scale
                                    userButtonTrigger: "w-12 h-12 !size-12",
                                    // Forces the wrapper element inside the trigger to match
                                    userButtonAvatarBox: "w-12 h-12 !size-12",
                                    // Forces the actual visual avatar image to stretch to full scale
                                    userButtonAvatarImage: "w-12 h-12 !size-12 object-cover"
                                }
                            }} />
                        </Show>
                    </li>
                </ul>

            </nav>
        </>
    );
}

export default Navbar;