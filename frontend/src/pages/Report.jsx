import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import ScoreGauge from "../components/ScoreGauge";
import SkillSection from "../components/SkillSection";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const role = location.state?.role;

  if (!result) {
    return (
      <div className="page">
        <Navbar />

        <main className="empty-report">
          <div>
            <span className="eyebrow">
              Resume Analysis
            </span>

            <h1>
              No report available
            </h1>

            <p>
              Start a new analysis to generate
              your resume report.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                navigate("/analyze")
              }
            >
              Start Analysis
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />

      <main className="report-container">

        <div className="report-header">

          <div>
            <span className="eyebrow">
              Analysis Complete
            </span>

            <h1>
              Resume Analysis
            </h1>

            <p>
              Target role:{" "}
              <strong>{role}</strong>
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/analyze")
            }
          >
            New Analysis
          </button>

        </div>

        {/* Score Hero */}

        <section className="report-hero">

          <div className="report-overview">

            <div className="overview-badge">
              Overall assessment
            </div>

            <h2>
              Your resume match score
            </h2>

            <p className="overview-text">
              {result.summary}
            </p>

            <div className="role-match">
              <div className="role-match-label">
                ROLE ALIGNMENT
              </div>

              <p>
                {result.role_match}
              </p>
            </div>

          </div>

          <ScoreGauge
            score={result.match_score}
          />

        </section>

        {/* Skills */}

        <div className="skill-grid">

          <SkillSection
            title="Matching Skills"
            skills={result.matching_skills}
            type="matching"
          />

          <SkillSection
            title="Partial Skills"
            skills={result.partial_skills}
            type="partial"
          />

          <SkillSection
            title="Missing Skills"
            skills={result.missing_skills}
            type="missing"
          />

        </div>

        {/* Pros / Cons */}

        <div className="two-column">

          <section className="report-card">

            <div className="section-title-row">
              <div>
                <h2>Strengths</h2>
                <p className="section-subtitle">
                  What is working in your resume.
                </p>
              </div>

              <span className="section-icon success">
                +
              </span>
            </div>

            <ul className="bullet-list success-list">
              {result.pros?.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

          </section>

          <section className="report-card">

            <div className="section-title-row">
              <div>
                <h2>Weaknesses</h2>
                <p className="section-subtitle">
                  Areas that may reduce your match.
                </p>
              </div>

              <span className="section-icon danger">
                !
              </span>
            </div>

            <ul className="bullet-list danger-list">
              {result.cons?.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

          </section>

        </div>

        {/* Improvements */}

        <section className="report-card">

          <div className="section-title-row">

            <div>
              <h2>
                Improvement Suggestions
              </h2>

              <p className="section-subtitle">
                Practical changes based on the
                target job description.
              </p>
            </div>

          </div>

          <div className="improvements">

            {result.improvements?.map(
              (item, index) => (
                <div
                  className="improvement-item"
                  key={index}
                >

                  <span className="improvement-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <strong>
                      {item.area}
                    </strong>

                    <p>
                      {item.suggestion}
                    </p>
                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* Section scores */}

        <section className="report-card">

          <div className="section-title-row">

            <div>
              <h2>
                Resume Section Scores
              </h2>

              <p className="section-subtitle">
                Section-by-section alignment with
                the target role.
              </p>
            </div>

          </div>

          <div className="section-scores">

            {Object.entries(
              result.section_scores || {}
            ).map(
              ([section, data]) => (
                <div
                  className="section-score"
                  key={section}
                >

                  <div className="section-score-header">

                    <strong>
                      {section}
                    </strong>

                    <span>
                      {data.score}/100
                    </span>

                  </div>

                  <div className="score-bar">
                    <div
                      style={{
                        width: `${data.score}%`,
                      }}
                    />
                  </div>

                  <p>
                    {data.comment}
                  </p>

                </div>
              )
            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Report;