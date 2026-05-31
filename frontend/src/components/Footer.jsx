import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">

                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            Campus Lost & Found
                        </div>
                        <p className="footer-text">
                            Helping students reconnect with their lost belongings quickly,
                            securely, and efficiently across the campus.
                        </p>
                    </div>

                    {/* Quick Links */}

                    <div className="footer-links">
                        <h4 className="footer-title">
                            Quick Links
                        </h4>

                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/register">Register</Link>

                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h4 className="footer-title">
                            Contact
                        </h4>

                        <p>📍 Campus Help Center</p>

                        <p>📧 support@campuslostfound.com</p>

                        <p>📞 +91 98765 43210</p>

                    </div>
                </div>

                {/* Bottom */}

                <div className="footer-bottom">
                    © 2026 Campus Lost & Found. All Rights Reserved.
                </div>

            </footer>
        </>
    );
}

export default Footer;