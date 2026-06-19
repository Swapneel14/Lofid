import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/Sidebar.css'

function SideBar(){

    return(

        <div className="sidebar">

            <h5>Main</h5>

            <NavLink to="/home" end>
                Dashboard
            </NavLink>

           
            <NavLink to="/home/all-lost-items">
                Lost Items
            </NavLink>

            <NavLink to="/home/foundItems">
                Found Items
            </NavLink>

            <hr/>

            <h5>Actions</h5>

            <NavLink to="/home/report-lost">
                Report Lost
            </NavLink>

            <NavLink to="/home/report-found">
                Report Found
            </NavLink>

            <hr/>

            <h5>Account</h5>


            <NavLink to="/home/claims">
                My Claims
            </NavLink>

            <NavLink to="/home/profile">
                Profile
            </NavLink>

        </div>

    );
}

export default SideBar;