import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/react";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RefreshCw } from "lucide-react"; // <-- Added icon import

// Helper function to extract and calculate batch from email
const calculateBatch = (email) => {
    if (!email) return "Unknown";
    const joiningYear = parseInt(email.substring(0, 4), 10);
    if (isNaN(joiningYear)) return "Unknown";
    return joiningYear + 4; // e.g., 2024 + 4 = 2028
};

function Admin() {
    const { getToken } = useAuth();

    // States
    const [reports, setReports] = useState([]);
    const [bannedUsersList, setBannedUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // <-- Added refreshing state
    const [activeTab, setActiveTab] = useState("reports");
    const [expandedUserId, setExpandedUserId] = useState(null);
    const api = import.meta.env.VITE_BACKEND_URL;

    // New State to map userId -> { name, email, batch }
    const [userDetails, setUserDetails] = useState({});

    // Fetch User Details by ID
    const fetchUserDetails = async (userIds) => {
        try {
            const token = await getToken();

            // Filter out any undefined or null IDs
            const validUserIds = userIds.filter(id => id);

            // Filter out IDs we are already aware of in the current closure
            const idsToFetch = validUserIds.filter(id => !userDetails[id]);
            if (idsToFetch.length === 0) return;

            const requests = idsToFetch.map(id =>
                axios.get(`${api}/api/admin/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).catch(() => null) // Catch individual errors so Promise.all doesn't fail
            );

            const responses = await Promise.all(requests);

            // FIX: Use a functional update to prevent overwriting concurrent state changes
            setUserDetails(prevDetails => {
                const mergedDetails = { ...prevDetails }; // Spread the MOST RECENT state

                responses.forEach((res, index) => {
                    const currentId = idsToFetch[index];
                    if (res && res.data && res.data.user) {
                        const user = res.data.user;
                        mergedDetails[currentId] = {
                            name: user.name || "Unknown Name",
                            email: user.email,
                            batch: calculateBatch(user.email)
                        };
                    } else {
                        // Mark as not found to break the infinite loading state loop
                        mergedDetails[currentId] = { name: "User Not Found", email: "", batch: "N/A" };
                    }
                });

                return mergedDetails;
            });
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Fetch Report Requests
    const fetchReports = async () => {
        try {
            const token = await getToken();
            const res = await axios.get(`${api}/api/admin/reports`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedReports = res.data.reports || [];
            setReports(fetchedReports);

            // Extract unique user IDs and fetch their details
            const uniqueIds = [...new Set(fetchedReports.map(r => r.reportedUserId))];
            fetchUserDetails(uniqueIds);

        } catch (e) {
            console.error(e);
            toast.error("Failed to load reports.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Banned Users
    const fetchBannedUsers = async () => {
        try {
            const token = await getToken();
            const res = await axios.get(`${api}/api/admin/get-banned-users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedBannedUsers = res.data.bannedUsers || [];
            setBannedUsersList(fetchedBannedUsers);

            // Extract unique user IDs and fetch their details
            const uniqueIds = [...new Set(fetchedBannedUsers.map(u => u.userId || u.reportedUserId))];
            fetchUserDetails(uniqueIds);

        } catch (e) {
            console.error(e);
            toast.error("Failed to load banned users.");
        }
    };

    // Initialize data
    useEffect(() => {
        fetchReports();
        fetchBannedUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Added Manual Refresh Handler ---
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await Promise.all([fetchReports(), fetchBannedUsers()]);
        setIsRefreshing(false);
        toast.success("Dashboard data refreshed!", { autoClose: 2000, position: "bottom-right" });
    };

    // Group reports by reportedUserId
    const groupedReports = reports.reduce((acc, report) => {
        if (!acc[report.reportedUserId]) {
            acc[report.reportedUserId] = [];
        }
        acc[report.reportedUserId].push(report);
        return acc;
    }, {});

    // Actions
    const banUser = async (reportedUserId) => {
        try {
            const token = await getToken();
            await axios.post(
                `${api}/api/admin/report/ban`,
                { reportedUserId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setReports((prev) => prev.filter((r) => r.reportedUserId !== reportedUserId));
            toast.success("User banned successfully.");
            fetchBannedUsers();
        } catch (e) {
            console.error(e);
            toast.error("Failed to ban user.");
        }
    };

    const ignoreUserReports = async (reportedUserId) => {
        try {
            const token = await getToken();
            await axios.delete(
                `${api}/api/admin/report/ignore`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { reportedUserId },
                }
            );

            setReports((prev) => prev.filter((r) => r.reportedUserId !== reportedUserId));
            setExpandedUserId(null);
            toast.success("Reports ignored and cleared.");
        } catch (e) {
            console.error(e);
            toast.error("Failed to ignore reports.");
        }
    };

    const unbanUser = async (userId) => {
        try {
            const token = await getToken();
            await axios.post(
                `${api}/api/admin/unban-user`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBannedUsersList((prev) => prev.filter((user) => user.userId !== userId));
            toast.success("User unbanned successfully.");
        } catch (e) {
            console.error(e);
            toast.error("Failed to unban user.");
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    if (loading) return <div className="flex! justify-center! items-center! h-screen! text-xl! font-semibold! text-slate-600!">Loading Admin Dashboard...</div>;

    return (
        <div className="min-h-screen! bg-slate-50! p-6! md:p-12!">
            <ToastContainer />
            <div className="max-w-5xl! mx-auto!">

                {/* --- Updated Header with Refresh Button --- */}
                <div className="flex! justify-between! items-center! mb-8!">
                    <h1 className="text-3xl! font-bold! text-slate-800!">Admin Dashboard</h1>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex! items-center! gap-2! px-4! py-2! bg-white! border! border-slate-200! text-slate-600! font-medium! rounded-lg! shadow-sm! hover:bg-slate-50! hover:text-blue-600! transition-all! focus:outline-none! disabled:opacity-50!"
                    >
                        <RefreshCw size={18} className={`${isRefreshing ? "animate-spin!" : ""}`} />
                        Refresh
                    </button>
                </div>

                <div className="flex! gap-4! mb-8! border-b! border-slate-200! pb-4!">
                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`px-6! py-2! rounded-lg! font-medium! transition-colors! ${activeTab === "reports" ? "bg-blue-600! text-white!" : "bg-white! text-slate-600! hover:bg-slate-100!"}`}
                    >
                        Report Requests ({Object.keys(groupedReports).length})
                    </button>
                    <button
                        onClick={() => setActiveTab("banned")}
                        className={`px-6! py-2! rounded-lg! font-medium! transition-colors! ${activeTab === "banned" ? "bg-red-600! text-white!" : "bg-white! text-slate-600! hover:bg-slate-100!"}`}
                    >
                        Banned Users ({bannedUsersList.length})
                    </button>
                </div>

                {/* --- TAB: REPORT REQUESTS --- */}
                {activeTab === "reports" && (
                    <div className="space-y-4!">
                        {Object.keys(groupedReports).length === 0 ? (
                            <p className="text-slate-500! bg-white! p-6! rounded-xl! border! border-slate-200! text-center!">No pending report requests.</p>
                        ) : (
                            Object.entries(groupedReports).map(([reportedUserId, userReports]) => {
                                const userInfo = userDetails[reportedUserId] || {};

                                return (
                                    <div key={reportedUserId} className="bg-white! rounded-xl! border! border-slate-200! shadow-sm! overflow-hidden!">

                                        {/* Accordion Header */}
                                        <div className="p-4! md:p-6! flex! flex-col! sm:flex-row! justify-between! items-start! sm:items-center! gap-4! bg-slate-50/50!">
                                            <div
                                                className="cursor-pointer! flex-1!"
                                                onClick={() => toggleExpand(reportedUserId)}
                                            >
                                                <h3 className="font-semibold! text-slate-800! text-lg!">
                                                    {userInfo.name ? userInfo.name : <span className="text-slate-400!">Loading Name...</span>}
                                                </h3>
                                                <div className="flex! gap-3! text-sm! mt-1!">
                                                    <span className="font-mono! text-blue-600! bg-blue-50! px-2! py-0.5! rounded!">Batch: {userInfo.batch || "Loading..."}</span>
                                                    <span className="text-red-500! font-medium!">
                                                        {userReports.length} {userReports.length === 1 ? "Report" : "Reports"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex! gap-3!">
                                                <button
                                                    onClick={() => ignoreUserReports(reportedUserId)}
                                                    className="px-4! py-2! text-sm! font-medium! text-slate-600! bg-white! border! border-slate-300! rounded-lg! hover:bg-slate-100! transition-colors!"
                                                >
                                                    Ignore All
                                                </button>
                                                <button
                                                    onClick={() => banUser(reportedUserId)}
                                                    className="px-4! py-2! text-sm! font-medium! text-white! bg-red-600! hover:bg-red-700! rounded-lg! transition-colors!"
                                                >
                                                    Ban User
                                                </button>
                                            </div>
                                        </div>

                                        {/* Accordion Body */}
                                        {expandedUserId === reportedUserId && (
                                            <div className="p-4! md:p-6! border-t! border-slate-200! bg-white!">
                                                <h4 className="text-sm! font-bold! text-slate-500! uppercase! tracking-wider! mb-4!">Report Details</h4>
                                                <div className="space-y-4!">
                                                    {userReports.map((report) => (
                                                        <div key={report._id} className="p-4! bg-red-50! rounded-lg! border! border-red-100!">
                                                            <p className="text-sm! text-slate-600! mb-2!">
                                                                <span className="font-semibold!">Reported by ID:</span> {report.reporterUserId || "Unknown"}
                                                            </p>
                                                            <div className="bg-white! p-3! rounded-md! border! border-slate-200! text-slate-800! italic!">
                                                                "{report.messageContent}"
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}

                {/* --- TAB: Banned USERS --- */}
                {activeTab === "banned" && (
                    <div className="space-y-4!">
                        {bannedUsersList.length === 0 ? (
                            <p className="text-slate-500! bg-white! p-6! rounded-xl! border! border-slate-200! text-center!">No banned users.</p>
                        ) : (
                            bannedUsersList.map((user) => {
                                const idToUse = user.userId || user.reportedUserId;
                                const userInfo = userDetails[idToUse] || {};

                                return (
                                    <div key={idToUse} className="p-4! md:p-6! bg-white! rounded-xl! border! border-slate-200! shadow-sm! flex! flex-col! sm:flex-row! justify-between! items-start! sm:items-center! gap-4!">
                                        <div>
                                            <h3 className="font-semibold! text-slate-800! text-lg!">
                                                {userInfo.name ? userInfo.name : <span className="text-slate-400!">Loading Name...</span>}
                                            </h3>
                                            <div className="text-sm! mt-1!">
                                                <span className="font-mono! text-red-600! bg-red-50! px-2! py-0.5! rounded!">Batch: {userInfo.batch || "Loading..."}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => unbanUser(idToUse)}
                                            className="px-4! py-2! text-sm! font-medium! text-white! bg-emerald-600! hover:bg-emerald-700! rounded-lg! transition-colors!"
                                        >
                                            Unban User
                                        </button>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Admin;