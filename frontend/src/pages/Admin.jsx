import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from "@clerk/react"
import "../css/Admin.css";
import axios from 'axios';

function Admin() {

    const { getToken } = useAuth();

    const [reports, setreports] = useState([]);
    const [loading, setloading] = useState(true);

    const fetchReports = async () => {
        try {
            const token = await getToken();

            const res = await axios.get(
                "http://localhost:6769/api/admin/reports",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setreports(res.data.reports);

        } catch (e) {
            console.log(e);
        } finally {
            setloading(false);
        }
    }

    const ignoreReport = async (id) => {
        try {
            const token = await getToken();
            console.log("clicked");

            await axios.delete(
                "http://localhost:6769/api/admin/report/ignore",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        id,
                    },
                }
            );

            setreports((prev) => prev.filter((report) => report._id !== id));

        } catch (e) {
            console.log(e);

        }
    }

    const banUser = async (id) => {
        try {
            const token = await getToken();

            await axios.delete(
                "http://localhost:6769/api/admin/report/ban",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        id,
                    },
                }
            );

            // Remove report from UI
            setreports((prev) => prev.filter((report) => report._id !== id));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchReports();
    }, [])

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="admin-container">
            <h1>Reported Users</h1>

            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                reports.map((report) => (
                    <div className="report-card" key={report._id}>
                        <h3>Reported User</h3>

                        <p>
                            <strong>Reporter:</strong> {report.reporterUserId}
                        </p>

                        <p>
                            <strong>Reported:</strong> {report.reportedUserId}
                        </p>

                        <p>
                            <strong>Reason:</strong> {report.messageContent}
                        </p>

                        <div className="btn-container">
                            <button
                                className="ban-btn"
                                onClick={() => banUser(report._id)}
                            >
                                Ban User
                            </button>

                            <button
                                className="ignore-btn"
                                onClick={() => ignoreReport(report._id)}
                            >
                                Ignore
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Admin;