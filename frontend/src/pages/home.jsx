import React from "react";
import { useState } from "react";
import SideBar from "../components/home-componets/SideBar";
import AllPosts from "../components/home-componets/AllPosts";
import Profile from "../components/home-componets/Profile";

import { Routes, Route } from "react-router-dom";
import Messages from "../components/home-componets/Messages";
import LostForm from "../components/home-componets/LostForm";
import FoundForm from "../components/home-componets/FoundForm";
import NotFound from "./PageNotFound";
import FoundItems from "../components/home-componets/FoundItems";
import AllLostItems from "./AllLostItems";

function Home() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (

        <div className="container-fluid">
            <button
                className="mobile-menu-btn"
                onClick={() => setShowSidebar(!showSidebar)}
            >
                ☰
            </button>

            <div className="row g-0">

                <div className={`col-lg-2 sidebar-wrapper ${showSidebar ? "show" : ""

                    }`}>

                    <SideBar />

                </div>
                <div className="col-lg-10 col-md-9">

                    <Routes>
                        <Route index element={<AllPosts />} />

                        <Route path="profile" element={<Profile />} />
                        <Route path="foundItems" element={<FoundItems />} />
                        <Route path="all-lost-items" element={<AllLostItems />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="report-lost" element={<LostForm />} />
                        <Route path="report-found" element={<FoundForm />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Home;
