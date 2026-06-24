import React from "react";
import "../css/Navbar.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Show, SignUpButton, UserButton } from "@clerk/react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  const showSearch =
    location.pathname === "/home/all-lost-items" ||
    location.pathname === "/home/foundItems";

  useEffect(() => {
    const timer = setTimeout(() => {
      // Update URL after 500ms of inactivity
      navigate(`${location.pathname}?search=${search}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-desktop">Campus Lost & Found</span>
          <span className="logo-mobile">LoFid</span>
        </div>
        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="search-btn">🔍</button>
          </div>
        )}

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
