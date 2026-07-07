import React from "react";
import "../css/Navbar.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Show, SignUpButton, UserButton, useAuth } from "@clerk/react";
import axios from "axios";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiCloseLargeLine } from "react-icons/ri";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getToken } = useAuth();
  const [toggle, setToggle] = useState(false);

  const [search, setSearch] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const showSearch =
    location.pathname === "/home/all-lost-items" ||
    location.pathname === "/home/foundItems";

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = await getToken();

        const res = await axios.get(
          "http://localhost:6769/api/admin/check",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setisAdmin(res.data.isAdmin);
      } catch (e) {
        setisAdmin(false);
      }
    }

    checkAdmin();
  }, [])

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

        <ul className="nav-links hidden! sm:flex!">
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/">About</Link>
          </li>

          <li>
            {isAdmin && (
              <Link to="/admin">Admin Dashboard</Link>
            )}
          </li>

          <li className="auth-section">
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

        <div
          className='sm:hidden flex flex-1 justify-end items-center cursor-pointer text-white'
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <RiCloseLargeLine className='w-6 h-6 object-contain' />
          ) : (
            <TfiMenuAlt className='w-6 h-6 object-contain' />
          )}
        </div>
        
        <div
          className={`${!toggle ? 'hidden' : 'flex'
            } absolute! top-20! right-0! p-6! mx-4! my-2! min-w-48! rounded-xl! z-50! bg-linear-to-br! from-white! to-blue-50! border border-blue-100! shadow-xl! shadow-blue-900/10!`}
        >
          <ul className="list-none! flex! flex-col! justify-end! items-start! gap-4! w-full! text-slate-700! font-medium!">
            <li className="w-full!" onClick={() => {
                  setToggle(!toggle);
                }}>
              <Link to="/home" className="block! w-full! hover:text-blue-600! transition-colors!">
                Home
              </Link>
            </li>

            <li className="w-full!" onClick={() => {
                  setToggle(!toggle);
                }}>
              <Link to="/" className="block! w-full! hover:text-blue-600! transition-colors!">
                About
              </Link>
            </li>

            {isAdmin && (
              <li className="w-full!" onClick={() => {
                  setToggle(!toggle);
                }}>
                <Link to="/admin" className="block! w-full! hover:text-blue-600! transition-colors!">
                  Admin Dashboard
                </Link>
              </li>
            )}

            {/* Added a subtle border-top to separate navigation from authentication */}
            <li className="w-full! mt-2! pt-4! border-t! border-blue-100/80!" onClick={() => {
                  setToggle(!toggle);
                }}>
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  {/* I kept your register-btn class, but added width so it looks good on mobile */}
                  <button className="w-full! bg-blue-600! hover:bg-blue-700! text-white! py-2! rounded-lg! transition-colors!">
                    Register
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <div className="flex! justify-start!">
                  <UserButton />
                </div>
              </Show>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
