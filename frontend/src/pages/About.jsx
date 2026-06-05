import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/About.css";

function About() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      {/* HERO */}

      <section className="hero">
        <div className="blur blur-1"></div>
        <div className="blur blur-2"></div>

        <div className="hero-content">
          <h1 className="hero-title">Campus Lost & Found - Lofid</h1>

          <p className="hero-desc">
            Making lost belongings easier to find through a secure, organized
            and community-powered platform.
          </p>

          <div className="hero-buttons">
            <a
              href="https://github.com/Swapneel14/Lofid"
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              View Repository
            </a>

            <button className="secondary-btn" onClick={() => navigate("/")}>
                Explore Platform
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-section">
        <div className="stat-box">
          <h2>100%</h2>
          <p>Student Focused</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Accessible</p>
        </div>

        <div className="stat-box">
          <h2>Secure</h2>
          <p>Clerk Authentication</p>
        </div>

        <div className="stat-box">
          <h2>MERN</h2>
          <p>Full Stack Powered</p>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="workflow">
        <h2 className="section-heading">How It Works</h2>

        <div className="workflow-line">
          <div className="step">
            <div className="step-circle">1</div>
            <h3>Lose Item</h3>
          </div>

          <div className="step">
            <div className="step-circle">2</div>
            <h3>Submit Report</h3>
          </div>

          <div className="step">
            <div className="step-circle">3</div>
            <h3>Search Matches</h3>
          </div>

          <div className="step">
            <div className="step-circle">4</div>
            <h3>Recover Item</h3>
          </div>
        </div>
      </section>

      {/* STORY */}

      <section className="story-section">
        <div className="story-left">🎒</div>

        <div className="story-right">
          <h2 className="section-heading">Why We Built This</h2>

          <p>
            Students lose wallets, ID cards, laptops, water bottles, books and
            countless other belongings every semester. Most campuses rely on
            informal WhatsApp groups and word-of-mouth communication. Campus
            Lost & Found centralizes the entire process, helping students
            reconnect with their belongings faster and more efficiently.
          </p>
        </div>
      </section>

      {/* TECH STACK */}

      <section className="tech-section">
        <h2 className="section-heading">Built Using</h2>

        <div className="tech-grid">
          <span>React</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
          <span>Mongoose</span>
          <span>Clerk</span>
        </div>
      </section>

      {/* GITHUB */}

      <section className="repo-banner">
        <h2>Open Source Repository</h2>

        <p>Explore source code, architecture, and implementation details.</p>

        <a href="https://github.com/Swapneel14/Lofid" target="_blank" rel="noreferrer">
          Open GitHub →
        </a>
      </section>

      {/* TEAM */}

      <section className="team-section">
        <h2 className="section-heading">Meet The Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <div className="avatar">U</div>

            <h3>K Uday Kumar</h3>

            <p>2024CSB019</p>

            <a href="https://github.com/Udayx404" target="_blank" rel="noreferrer">GitHub</a>
          </div>

          <div className="team-card">
            <div className="avatar">S</div>

            <h3>Swapneel Sarkar</h3>

            <p>2024CSB021</p>

            <a href="https://github.com/Swapneel14" target="_blank" rel="noreferrer">GitHub</a>
          </div>

          <div className="team-card">
            <div className="avatar">S</div>

            <h3>Subham Das</h3>

            <p>2024CSB023</p>

            <a href="https://github.com/subhamgit08" target="_blank" rel="noreferrer">GitHub</a>
          </div>

          <div className="team-card">
            <div className="avatar">N</div>

            <h3>Nirupam Das</h3>

            <p>2024CSB108</p>

            <a href="https://github.com/NDDAS05" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
