import React, { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/react";
import '../../css/Profile.css'
import axios from "axios";

import ReportCard from "../profile-components/LostItem";


function Profile() {
    const { user, isSignedIn } = useUser();

    const [lostReports, setLostReports] = useState([]);
    const [foundReports, setFoundReports] = useState([]);
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {

        const fetchReports = async () => {

            try {

                const [lostRes, foundRes] = await Promise.all([

                    axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/item/get-recent-lost/${user.id}`
                    ),

                    axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/item/get-recent-found/${user.id}`
                    )

                ]);

                if (lostRes.data.success) {
                    setLostReports(
                        lostRes.data.LostReports
                    );
                }

                if (foundRes.data.success) {
                    setFoundReports(
                        foundRes.data.FoundReports
                    );
                }

            } catch (err) {
                console.log(err);
            }
        };

        if (user?.id) {
            fetchReports();
        }

    }, [user?.id]);

    if (!user) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "100vh",
                    background: "#f8fafc",
                }}
            >
                <div
                    className="card shadow-lg border-0 text-center p-4"
                    style={{
                        maxWidth: "450px",
                        width: "90%",
                        borderRadius: "20px",
                    }}
                >
                    <div style={{ fontSize: "4rem" }}>
                        🔒
                    </div>

                    <h2 className="fw-bold mt-3">
                        Login Required
                    </h2>

                    <p className="text-muted">
                        Please sign in to view lost item
                        reports and access chat rooms.
                    </p>

                    <SignInButton mode="modal">
                        <button className="btn btn-primary btn-lg mt-2">
                            Login
                        </button>
                    </SignInButton>
                </div>
            </div>
        );
    }

    const email = user.primaryEmailAddress?.emailAddress;

    const username = email.split(".")[0];

    const admissionYear = username.slice(0, 4);

    const graduationYear =
        Number(admissionYear) + 4;

    const departmentCode =
        username.slice(4, 7).toUpperCase();

    const rollNumber =
        username.slice(4);

    const clerkName =
        user.fullName || "";

    const pattern = /^\d{4}[A-Z]{3}\d{3}_/;

    const displayName = /^\d{4}/.test(clerkName)
        ? clerkName.split(" ")[1]?.replace(/_/g, " ") || clerkName
        : clerkName;

    const departmentMap = {

        CSB: "Computer Science and Technology",

        ITB: "Information Technology",

        ETB: "Electronics and Telecommunication Engineering",

        EEB: "Electrical Engineering",

        MEB: "Mechanical Engineering",

        CEB: "Civil Engineering",

        AMB: "Aerospace Engineering and Applied Mechanics",

        MNB: "Mining Engineering",

        MMB: "Metallurgy and Materials Engineering"
    };

    const department =
        departmentMap[departmentCode]
        || departmentCode;

    return (

        <div className="profile-wrapper">

            <div className="profile-card">

                <div className="profile-top">

                    <img
                        src={user.imageUrl}
                        alt="profile"
                        className="profile-image"
                    />

                    <div className="profile-main">

                        <h1 className="profile-name">
                            {displayName}
                        </h1>

                        <h3 className="profile-department">
                            {department}
                        </h3>

                        <p className="profile-email">
                            {email}
                        </p>

                    </div>

                </div>

                <div className="profile-details">

                    <div className="info-box">

                        <span className="info-title">
                            Roll Number
                        </span>

                        <span className="info-value">

                            {
                                admissionYear +
                                rollNumber.toUpperCase()
                            }

                        </span>

                    </div>

                    <div className="info-box">

                        <span className="info-title">
                            Admission Year
                        </span>

                        <span className="info-value">
                            {admissionYear}
                        </span>

                    </div>

                    <div className="info-box">

                        <span className="info-title">
                            Batch
                        </span>

                        <span className="info-value">
                            {graduationYear}
                        </span>

                    </div>

                </div>


            </div>
            <div className="reports-container">

                <div className="reports-column">

                    <h2 className="reports-title">
                        Lost Reports
                    </h2>

                    {
                        lostReports.length === 0 ? (
                            <p>No lost reports available.</p>
                        ) : (
                            lostReports.map((report) => (
                                <ReportCard
                                    key={report._id}
                                    report={report}
                                />
                            ))
                        )
                    }

                </div>

                <div className="reports-column">

                    <h2 className="reports-title">
                        Found Reports
                    </h2>

                    {
                        foundReports.length === 0 ? (
                            <p>No found reports available.</p>
                        ) : (
                            foundReports.map((report) => (
                                <ReportCard
                                    key={report._id}
                                    report={report}
                                />
                            ))
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default Profile;