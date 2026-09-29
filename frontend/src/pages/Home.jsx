import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <Navbar />

      <main className="hero">

        <div className="hero-content">

          <span className="eyebrow">
            AI-Powered Resume Analysis
          </span>

          <h1>
            Does your resume
            <span>match the job?</span>
          </h1>

          <p>
            Analyze your resume against any job description
            and get a structured breakdown of your skills,
            gaps, strengths, and actionable improvements.
          </p>

          <button
            className="primary-button hero-button"
            onClick={() => navigate("/analyze")}
          >
            Start Analyzing
            <span>→</span>
          </button>

          <div className="hero-features">
            <span>Resume analysis</span>
            <span>Skill matching</span>
            <span>Actionable insights</span>
          </div>

        </div>

        <div className="hero-preview">

          <div className="preview-top">
            <span>Resume Match</span>

            <span className="preview-live">
              Analysis complete
            </span>
          </div>

          <div className="preview-score">
            <strong>82</strong>
            <span>/100</span>
          </div>

          <div className="preview-bar">
            <span />
          </div>

          <div className="preview-label">
            Strong Match
          </div>

          <div className="preview-divider" />

          <div className="preview-grid">

            <div>
              <strong>12</strong>
              <span>Matching</span>
            </div>

            <div>
              <strong>4</strong>
              <span>Missing</span>
            </div>

            <div>
              <strong>5</strong>
              <span>Partial</span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Home;