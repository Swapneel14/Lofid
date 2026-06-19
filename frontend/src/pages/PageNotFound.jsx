import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PageNotFound.css";

const NotFound = () => {
  const dotsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = dotsRef.current;
    if (!container) return;

    const colors = [
      "#1D9E75",
      "#185FA5",
      "#5DCAA5",
      "#378ADD",
      "#0F6E56",
      "#B5D4F4",
      "#9FE1CB",
    ];

    for (let i = 0; i < 20; i++) {
      const dot = document.createElement("div");
      dot.className = "enf-dot";
      const size = 5 + Math.random() * 18;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDuration = `${3 + Math.random() * 5}s`;
      dot.style.animationDelay = `${Math.random() * 4}s`;
      container.appendChild(dot);
    }

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div className="enf-root">
      {/* Background blobs */}
      <div className="enf-blob enf-blob--1" />
      <div className="enf-blob enf-blob--2" />
      <div className="enf-blob enf-blob--3" />

      {/* Floating dots */}
      <div className="enf-dots" ref={dotsRef} aria-hidden="true" />

      <main className="enf-container">
        {/* Illustration */}
        <div className="enf-illustration" aria-hidden="true">
          <div className="enf-404">
            404
            <span className="enf-lost-tag">Lost!</span>
          </div>

          <div className="enf-mag-track">
            <div className="enf-mag-wrap">
              <svg
                className="enf-mag-svg"
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="46"
                  cy="88"
                  rx="26"
                  ry="6"
                  fill="#0F6E56"
                  opacity="0.15"
                />

                <circle
                  cx="46"
                  cy="50"
                  r="32"
                  fill="#fff"
                  stroke="#1D9E75"
                  strokeWidth="6"
                />

                <circle cx="46" cy="50" r="26" fill="#eaf6f4" opacity="0.8" />

                <circle cx="36" cy="40" r="5" fill="white" opacity="0.6" />

                <text
                  x="46"
                  y="58"
                  textAnchor="middle"
                  fontFamily="'Space Mono', monospace"
                  fontSize="22"
                  fontWeight="700"
                  fill="#185FA5"
                >
                  ?
                </text>

                <line
                  x1="70"
                  y1="74"
                  x2="100"
                  y2="106"
                  stroke="#185FA5"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                <line
                  x1="70"
                  y1="74"
                  x2="100"
                  y2="106"
                  stroke="#5DCAA5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Copy */}
        <h1 className="enf-headline">Looks like this page is lost too!</h1>
        <p className="enf-subline">
          We searched high and low, but couldn&apos;t find what you&apos;re
          looking for. Maybe it ended up in our Lost &amp; Found box?
        </p>

        {/* CTA with glow wrapper */}
        <div className="enf-btn-wrap">
          <button className="enf-home-btn" onClick={() => navigate("/home")}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <polyline points="9 21 9 12 15 12 15 21" />
            </svg>
            Back to Home
          </button>
        </div>

        <button className="enf-report-link" onClick={() => navigate("/report")}>
          Report a missing page →
        </button>
      </main>
    </div>
  );
};

export default NotFound;
