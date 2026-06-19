import React from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Show,
  SignUpButton,
  UserButton,
} from "@clerk/react";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
  <span className="logo-desktop">Campus Lost & Found</span>
  <span className="logo-mobile">LoFid</span>
</div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search items..."
            className="search-input"
          />

          <button className="search-btn">🔍</button>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/">About</Link>
          </li>

          <li className="auth-section">
            {/* <SignedOut>
              <SignUpButton mode="modal">
                <button className="register-btn">Register</button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: "w-10 h-10",
                    userButtonAvatarBox: "w-10 h-10",
                    userButtonAvatarImage: "w-10 h-10 object-cover",
                  },
                }}
              />
            </SignedIn> */}


              {/* //for the latest package setup of clerk */}
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="register-btn">Register</button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
