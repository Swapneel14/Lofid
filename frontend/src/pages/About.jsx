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
            Empowering campus communities to report, discover, and recover lost belongings through a secure and collaborative digital platform.
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

            <button className="secondary-btn" onClick={() => navigate("home")}>
              Explore Platform
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-section">
        <div className="stat-box">
          <span className="stat-label">Built For</span>
          <h2>Campus Communities</h2>
          <p>
            Designed specifically to simplify lost and found management
            across educational institutions.
          </p>
        </div>

        <div className="stat-box">
          <span className="stat-label">Powered By</span>
          <h2>Community Trust</h2>
          <p>
            Encouraging students to help reconnect people with
            their valuable belongings.
          </p>
        </div>

        <div className="stat-box">
          <span className="stat-label">Security First</span>
          <h2>Verified Access</h2>
          <p>
            Protected authentication and secure user identity
            management for every report.
          </p>
        </div>

        <div className="stat-box">
          <span className="stat-label">Built With</span>
          <h2>Modern Technology</h2>
          <p>
            Engineered using scalable full-stack technologies
            for reliability and performance.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="workflow">
        <h2 className="section-heading">
  From Report to Recovery
</h2>

        <div className="workflow-line">

          <div className="step">
            <div className="step-circle">01</div>

            <h3>Campus Verification</h3>

            <p>
              Access is restricted to verified students using
              their institutional email accounts.
            </p>
          </div>

          <div className="step">
            <div className="step-circle">02</div>

            <h3>Report Listing</h3>

            <p>
              Publish lost or found item reports with relevant
              details and supporting information.
            </p>
          </div>

          <div className="step">
            <div className="step-circle">03</div>

            <h3>Member Connection</h3>

            <p>
              Lost belongings are successfully reunited with
              their rightful owners.
            </p>
          </div>

          <div className="step">
            <div className="step-circle">04</div>

            <h3>Item Recovery</h3>

            <p>
              Through secure collaboration and communication,
              misplaced belongings are successfully reunited
              with their rightful owners.
            </p>
          </div>

        </div>
      </section>

      {/* STORY */}

      {/* STORY */}

<section className="story-section">

  <div className="story-left">
    ✦
  </div>

  <div className="story-right">

    <div className="story-tag">
      OUR MISSION
    </div>

    <h2 className="section-heading story-heading">
      Making Campus Recovery Simple, Trusted, and Accessible
    </h2>
<p className="story-highlight">
   Building a more connected campus experience through a
  trusted and organized lost-and-found ecosystem.
</p>

<p className="story-highlight">
  The idea behind LOFID emerged from a simple observation:
  most lost-and-found information is circulated through
  year-specific or department-specific WhatsApp groups.
</p>

<p className="story-highlight">
   Because these channels rarely reach the entire campus,
  valuable opportunities for recovery are often missed.
  LOFID bridges this gap by connecting verified students
  through a single, campus-wide platform.
</p>

  </div>

</section>
{/* TECH STACK */}

<section className="tech-section">

  <div className="section-tag-wrapper">
  <div className="section-tag">
    TECHNOLOGY
  </div>
</div>

  <h2 className="section-heading">
    Powered by Modern Technologies
  </h2>

  <p className="tech-intro">
    Carefully selected technologies work together to provide
    secure authentication, real-time communication, and a
    reliable experience across campus communities.
  </p>

  <div className="tech-grid">

    <div className="tech-pill">
      <h3>React</h3>
      <p>Frontend Experience</p>
    </div>

    <div className="tech-pill">
      <h3>Node.js</h3>
      <p>Backend Runtime</p>
    </div>

    <div className="tech-pill">
      <h3>Express.js</h3>
      <p>API Architecture</p>
    </div>

    <div className="tech-pill">
      <h3>MongoDB</h3>
      <p>Data Storage</p>
    </div>

    <div className="tech-pill">
      <h3>Clerk</h3>
      <p>Student Authentication</p>
    </div>

    <div className="tech-pill">
      <h3>Socket.IO</h3>
      <p>Real-Time Messaging</p>
    </div>

    <div className="tech-pill">
      <h3>Inngest</h3>
      <p>Background Workflows</p>
    </div>

  </div>

</section>
{/* TEAM */}

{/* TEAM */}

<section className="team-section">

  <div className="section-tag-wrapper">
    <div className="section-tag">
      CONTRIBUTORS
    </div>
  </div>

  <h2 className="section-heading">
    The People Behind LOFID
  </h2>

  <p className="team-intro">
    A shared vision, countless iterations, and a commitment to solving
    everyday campus challenges through technology.
  </p>
<div className="contributors-row">

  <div className="contributor-card">
    <span className="accent-line"></span>

    <h3>K Uday Kumar</h3>

    <p>Batch of 2028</p>

    <a
      href="https://github.com/Udayx404"
      target="_blank"
      rel="noreferrer"
    >
      GitHub ↗
    </a>
  </div>

  <div className="contributor-card">
    <span className="accent-line"></span>

    <h3>Swapneel Sarkar</h3>

    <p>Batch of 2028</p>

    <a
      href="https://github.com/Swapneel14"
      target="_blank"
      rel="noreferrer"
    >
      GitHub ↗
    </a>
  </div>

  <div className="contributor-card">
    <span className="accent-line"></span>

    <h3>Subham Das</h3>

    <p>Batch of 2028</p>

    <a
      href="https://github.com/subhamgit08"
      target="_blank"
      rel="noreferrer"
    >
      GitHub ↗
    </a>
  </div>

  <div className="contributor-card">
    <span className="accent-line"></span>

    <h3>Nirupam Das</h3>

    <p>Batch of 2028</p>

    <a
      href="https://github.com/NDDAS05"
      target="_blank"
      rel="noreferrer"
    >
      GitHub ↗
    </a>
  </div>

</div>

</section>

{/* OPEN SOURCE */}

<section className="opensource-section">

  <div className="opensource-container">

    <div className="section-tag-wrapper">
      <div className="section-tag">
        OPEN SOURCE
      </div>
    </div>

    <h2 className="opensource-heading">
      Built in Public, Open for Innovation
    </h2>

    <p className="opensource-text">
      LOFID is developed as an open-source project. We believe in
      transparency, collaboration, and continuous improvement through
      community contributions.
    </p>

    <p className="opensource-text secondary">
      Explore the architecture, review the implementation, discover
      how different technologies come together, or contribute ideas
      that help shape the future of the platform.
    </p>

    <div className="opensource-actions">

      <a
        href="https://github.com/Swapneel14/Lofid"
        target="_blank"
        rel="noreferrer"
        className="repo-btn"
      >
        View Repository ↗
      </a>

    </div>

  </div>

</section>
    </div>
  );
}

export default About;
