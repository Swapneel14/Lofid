import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/Sidebar.css'

function SideBar(){

    return(

        <div className="sidebar">

            <h5>Main</h5>

            <NavLink to="/">
                Dashboard
            </NavLink>

           
            <NavLink to="/lost">
                Lost Items
            </NavLink>

            <NavLink to="/foundItems">
                Found Items
            </NavLink>

            <hr/>

            <h5>Actions</h5>

            <NavLink to="/report-lost">
                Report Lost
            </NavLink>

            <NavLink to="/report-found">
                Report Found
            </NavLink>

            <hr/>

            <h5>Account</h5>


            <NavLink to="/claims">
                My Claims
            </NavLink>

            <NavLink to="/profile">
                Profile
            </NavLink>

        </div>

    );
}

export default SideBar;