import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser, SignInButton } from '@clerk/react';
import { motion } from 'framer-motion';
import { Search, Layers, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import PostCard from '../dashboard-card-component/PostCard';
import "../../css/DashBoard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
    const { user } = useUser();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserItems = async () => {
            if (!user?.id) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:6769/api/item/get-all-items/${user.id}`);
                const result = await response.json();

                if (result.success) {
                    setItems(result.data);
                } else {
                    setError(result.message || "Failed to sync posts.");
                }
            } catch (err) {
                console.error(err);
                setError("Could not safely connect to database endpoints.");
            } finally {
                setLoading(false);
            }
        };

        if (isSignedIn) fetchUserItems();
    }, [isSignedIn, user]);

    const handleEdit = (item) => {
        const route = item.status === 'lost' ? '/edit-lost-item' : '/edit-found-item';
        navigate(`/home/${route}/${item._id}`);
    };

    if (!isAuthLoaded) {
        return (
            <div className="p-12 flex items-center justify-center min-h-[60vh]">
                <div className="text-slate-400 font-medium text-base animate-pulse tracking-wide">
                    Syncing security tokens...
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
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

    // Calculate metrics for the stats section
    const totalPosts = items.length;
    const lostCount = items.filter(item => item.status === 'lost').length;
    const foundCount = items.filter(item => item.status === 'found').length;

    return (
        <div className="container py-4">

            {/* HERO */}
            <div className="dashboard-hero">

                <div className="dashboard-hero-glow"></div>

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-8 text-center text-lg-start">

                            <div className="dashboard-hero-badge">
                                ✨ Dashboard Overview
                            </div>

                            <h1 className="dashboard-hero-title">
                                Welcome back,
                                <span className="dashboard-hero-name">
                                    {" "}{user?.firstName || "Student"} 👋
                                </span>
                            </h1>

                            <p className="dashboard-hero-subtitle">
                                Manage your lost and found reports with ease and stay connected with your campus community.
                            </p>

                        </div>

                        <div className="col-lg-4 mt-4 mt-lg-0">

                            <div className="dashboard-profile-card mx-auto ms-lg-auto">

                                <img
                                    src={user?.imageUrl}
                                    className="dashboard-profile-image"
                                    alt="profile"
                                />

                                <div>

                                    <h5>{user?.fullName}</h5>

                                    <p>Campus Member</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>



            {/* STATS */}

            {!loading && !error && (

                <div className="dashboard-stats-section">

                    <div className="row g-4">

                        <div className="col-lg-4 col-md-6">

                            <div className="dashboard-stat-card">

                                <div className="dashboard-stat-icon blue">

                                    <Layers size={28} />

                                </div>

                                <div>

                                    <p className="dashboard-stat-label">
                                        Total Reports
                                    </p>

                                    <h2 className="dashboard-stat-value">
                                        {totalPosts}
                                    </h2>

                                </div>

                            </div>

                        </div>



                        <div className="col-lg-4 col-md-6">

                            <div className="dashboard-stat-card">

                                <div className="dashboard-stat-icon red">

                                    <AlertCircle size={28} />

                                </div>

                                <div>

                                    <p className="dashboard-stat-label">
                                        Lost Items
                                    </p>

                                    <h2 className="dashboard-stat-value">
                                        {lostCount}
                                    </h2>

                                </div>

                            </div>

                        </div>



                        <div className="col-lg-4 col-md-12">

                            <div className="dashboard-stat-card">

                                <div className="dashboard-stat-icon green">

                                    <CheckCircle2 size={28} />

                                </div>

                                <div>

                                    <p className="dashboard-stat-label">
                                        Found Items
                                    </p>

                                    <h2 className="dashboard-stat-value">
                                        {foundCount}
                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}



            {/* RECENT ACTIVITY */}

            <div className="dashboard-recent-wrapper">

                <div className="dashboard-recent-left">

                    <h2 className="dashboard-recent-title">
                        Recent Activity
                    </h2>

                    <p className="dashboard-recent-subtitle">
                        Keep track of your latest lost and found reports.
                    </p>

                </div>

                <button className="dashboard-view-btn">

                    View All

                    <span className="ms-2">
                        →
                    </span>

                </button>

            </div>



            {/* LOADING */}

            {loading && (

                <div className="row g-4">

                    {[1, 2, 3].map((n) => (

                        <div className="col-lg-4 col-md-6" key={n}>

                            <div
                                className="bg-white rounded-4 shadow-sm"
                                style={{ height: "300px" }}
                            />

                        </div>

                    ))}

                </div>

            )}



            {/* ERROR */}

            {error && (

                <div className="alert alert-danger mt-4">

                    {error}

                </div>

            )}



            {/* EMPTY */}

            {!loading && !error && items.length === 0 && (

                <div className="text-center py-5 bg-white rounded-4 shadow-sm mt-4">

                    <Layers size={48} className="mb-3 text-secondary" />

                    <p className="text-muted mb-0">

                        You haven't submitted any lost or found items yet.

                    </p>

                </div>

            )}



            {/* POSTS */}

            {!loading && !error && items.length > 0 && (

                <div className="row g-4">

                    {items.map((item) => (

                        <div className="col-xl-4 col-md-6" key={item._id}>

                            <PostCard
                                item={item}
                                onEdit={handleEdit}
                            />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}